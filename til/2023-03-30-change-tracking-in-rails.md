---
til-tags: ["ruby", "rails"]
title: "Manual change tracking in Ruby on Rails"
date: 2023-03-30
---

This week I was working on a project where the users need to see the history of changes to a particular model. We had been using the Papertrail gem for this, but in the process of making our display of the history more robust, decided to create our own model to explicitly track the changes we cared about instead. Here's what I did.

Let's say we're working with a model like this: 

```
# == Schema Information
#
# Table name: bicycles
#  needs_repair               :boolean          default(FALSE)
#  in_repair                  :boolean          default(FALSE)
#  notes                      :text
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  bicycle_type_id            :bigint
#  brand_id                   :bigint
#  location_id                :bigint
class Bicycle < ApplicationRecord
  belongs_to :bicycle_type
  belongs_to :brand
  belongs_to :location
end
```

And we need to keep track of the history - if someone updated the location of the bike, we need to know who did that and when it happened. 

Now, we could use a gem like Papertrail, but today we aren't doing that for whatever reason. So we are going to create our own model called BicycleHistory. 

We'll add a migration and a new model: 

```
class CreateBicycleHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :bicycle_histories do |t|
      t.references :bicycle
      t.references :user, type: :uuid, optional: true     # who made the change?
      t.references :bicycle_type, optional: true
      t.references :brand, optional: true
      t.references :location, optional: true
      t.boolean :in_repair
      t.boolean :needs_repair
      t.text :notes
      t.timestamps
    end
  end
end
```

```
class BicycleHistory < ApplicationRecord
  belongs_to :bicycle, inverse_of: :bicycle_histories

  # optional: true because some of the paper trail histories we're backfilling don't have a whodunnit associated with them
  belongs_to :user, optional: true

  belongs_to :bicycle_type, optional: true
  belongs_to :brand, optional: true
  belongs_to :location, optional: true
```

Our first pass at writing a method to save the history might look something like this, on the Bicycle model class: 

```
class Bicycle < ApplicationRecord
  after_update :create_bicycle_history

 def create_bicycle_history
    return unless saved_changes?

    bicycle_history = BicycleHistory.new(bicycle: self)
    bicycle_history.brand_id = brand if saved_change_to_attribute?(:brand)
    bicycle_history.location_id = location_id if saved_change_to_attribute?(:location_id)
    bicycle_history.bicycle_type_id = bicycle_type_id if saved_change_to_attribute?(:bicycle_type_id)
    bicycle_history.in_repair = in_repair if saved_change_to_attribute?(:in_repair)
    bicycle_history.needs_repair = needs_repair if saved_change_to_attribute?(:needs_repair)
    bicycle_history.save
  end
end
```

The interesting parts of this approach are the `saved_changes?` and `saved_change_to_attribute?` methods, both provided by [ActiveRecord::Dirty](https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Dirty.html), which is going to be our best friend for this feature. 

In an Active Record model, thanks to ActiveRecord::Dirty, `saved_changes()` returns a hash containing all the changes that were just saved (in the last call to `save`). `saved_changes?` will tell you if the last call to `save` had any changes, that is, it answers the same question as `saved_changes.present?`. 

That's great! This is working well. We can write a test using Minitest conventions and Fabricator (I usually prefer factories but this project has a Fabricator convention) ensuring each of our attributes were saved correctly, that might look something like this: 

```
  test "creates bicycle history after update of bicycle location" do
    bicycle = Fabricate.create(:bicycle)
    bicycle.location = Location.create
    bicycle.save
    bicycle_history = BicycleHistory.last
    assert_equal bicycle.location, bicycle_history.reload.location
  end
  ```

Yay! The test is green, we're doing great.

But! We forgot to save who the user is that made the change. And unfortunately, we don't have that information in the after_update callback of our model. We need to pass the user in from the controller in order to get the logged-in user who made the change through the site's UI. So, we'll need to change our method from being a callback to something called explicitly after a successful update in our controller, and give it an `updater` parameter so we can pass in the user.

That method is also using a lot of code that looks quite similar, with just the attribute names changing. We can use a bit of metaprogramming (writing code that produces other code that gets executed) to simplify it. 

Let's add some `TRACKED_FIELDS` to our BicycleHistory model: 
```
  TRACKED_FIELDS = [
    :location_id,
    :brand_id,
    :bicycle_type_id,
    :in_repair,
    :needs_repair
  ]    
```
and use them like this in our method on Bicycle: 
```
  def create_bicycle_history(updater)
    return unless saved_changes?

    bicycle_history = BicycleHistory.new(bicycle: self)
    bicycle_history.user = updater unless updater.blank?
    BicycleHistory::TRACKED_FIELDS.each do |attribute|
      bicycle_history.public_send("#{attribute}=", public_send(attribute)) if saved_change_to_attribute?(attribute)
    end

    bicycle_history.save
  end
  ```

Here we're calling the assignment method provided by ActiveRecord automatically for each attribute we want to track, and giving it the current value of the attribute if there were any changes the last time the attribute got saved.

This could be subject to race conditions if we had a lot of people using our app at once and it was multi-threaded, but the app I'm working on is single threaded.

This is looking great! Our tests, after being updated to explicitly call the create_bicycle_history method, are still green!

Let's say we now want to display the changes in a table for our users on our site. But, we don't want to have a lot of repetition in our frontend code, either. So let's use some metaprogramming again. 

We'll put this on the InstrumentHistory model: 
```
  def change_information
    InstrumentHistory::TRACKED_FIELDS.map do |field|
      "#{field.to_s.titleize}: " + public_send(field.to_s.sub("_id", "")).to_s if public_send(field).present?
    end.compact
  end
```

Our fields are stored as symbols, so we need to call `to_s` before we can use string methods on them like `titleize`. 

We don't want to display the location id in our UI; we want to display the location name. So, here: `public_send(field.to_s.sub("_id", "")).to_s` we're stripping the `_id` portion of the attribute name off, so that Active Record will give us the actual model, not just the id. Then we're calling to_s on the model to give us back the user-relevant model info, which we can support by adding a `to_s` override on the models we care about like this: 

```
class Location
  def to_s
    name
  end
end
```

If the attribute is already a string or can be converted to one, or doesn't have a `_id` substring to strip off, our code still works just fine for displaying the value (like for our booleans). 

Yay! Pretty code. 


### A weird rabbit hole about saving changes to associated records

Something I noticed while writing my tests, after updating my code to _not_ use a callback and instead call my change tracking method explictly, is that my test failed if the model my history `belongs_to` wasn't already saved.

```
  test "creates bicycle history after update of bicycle location" do
    bicycle = Fabricate.create(:bicycle)
    bicycle.location = Location.create   # Location.new doesn't work!
    bicycle.save
    bicycle_history = BicycleHistory.last
    assert_equal bicycle.location, bicycle_history.reload.location
  end
```

This seems to be because when you save a nested belongs_to relationship as part of saving a parent model, the [belongs_to assocation runs a callback after update](https://github.com/rails/rails/blob/7-0-stable/activerecord/lib/active_record/associations/builder/belongs_to.rb#L83-L97) that clears the `saved_changes`. I added a comment in my code making a note of that, but it's okay for right now because right now we don't have a nested form for creating Locations (or any other associated records) when updating a Bicycle. 
