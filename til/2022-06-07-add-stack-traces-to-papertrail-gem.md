---
til-tags: ["ruby", "rails"]
title: "Adding stack traces to versions stored by the Papertrail Ruby gem"
date: 2022-06-07
---

I've been working on a tricky bug for a client at [Unabridged Software](https://unabridgedsoftware.com) where data records are getting created over and over somewhere in the code, and I'm having trouble figuring out where. I want to store the stack trace for what line of code caused a record of a particular model to be created. Enter, [PaperTrail](https://github.com/paper-trail-gem/paper_trail)! 

I couldn't have added the stack traces without the helpful hints provided by [this old blog post on RubyRailsExpert.com](http://web.archive.org/web/20141120233916/http://rubyrailsexpert.com/?p=36). But, that version refers to PaperTrail version 3+, and PaperTrail is now on v12! So a few things needed to be tweaked. 

Here's what I did.

1. [Install PaperTrail](https://github.com/paper-trail-gem/paper_trail#1b-installation) following the instructions in the readme. 

2. Add a migration to add a `stack` field to the PaperTrail versions column. 
```ruby
class AddStackToPapertrail < ActiveRecord::Migration[5.2]
  def change
    add_column :versions, :stack, :text, null: true
  end
end
```

3. Create a file at `app/models/paper_trail_version_extensions` with the methods I want. (You could also add these methods directly in the place we're about to reference them from, if you wanted.)

```ruby
module PaperTrailVersionExtensions

  def get_stack 
    YAML::load(stack)
  end

  def print_stack
    get_stack.each do |entry|
      puts "  * #{entry}"
    end
  end
end
```

4. In `config/initializers/paper_trail.rb`, open up the PaperTrail::Version class like this: 

```ruby
module PaperTrail
  class Version < ActiveRecord::Base # Cannot use ApplicationRecord here so you may need to disable Rubocop for this line with `rubocop:disable Rails/ApplicationRecord`.

    include PaperTrail::VersionConcern

    # this is the file we created; you could also add get_stack and print_stack directly here
    include PaperTrailVersionExtensions
  end
end
```

5. Finally, in the model class that you want to use PaperTrail with and have stack traces, include a `meta` option for the stack like this:
```ruby
has_paper_trail meta: { stack: :get_stack }
```

Now you should be able to see the stack traces for new versions created by PaperTrail by calling `version.get_stack` or `version.print_stack`. 

Hope this helps!
