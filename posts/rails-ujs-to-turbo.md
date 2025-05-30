---
layout: post
tags: ["posts", "rails", "code"]
title: "Migrating a a Rails Project from rails-ujs to Turbo"
description: "Some things you may want to do"
date: 2025-05-30T13:13:00-05:00
---

Recently I was helping update an app built in Ruby on Rails. It's an internal tool, so has been sitting for a while, running along happily on somewhat outdated tech. It was updated to Rails 7 already, and is already using jsbundling-rails for JavaScript, but a lot of the code for each page hasn't been touched in quite a while. 

We decided to remove [Rails UJS](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#replacements-for-rails-ujs-functionality) which was standard in Rails 6 in favor of [Hotwired Turbo](https://turbo.hotwired.dev/) which is the new default.

Along the way there were several changes to make, including a few that weren't obvious at first. Here is a list of things that needed to change for us, and maybe will help you make a similar migration, too.

## Basic Updates
You'll need to uninstall Rails UJS, and add Turbo. We also had Jquery-UJS installed which we don't need any more either.

Take note of whether your project uses yarn or npm; yarn has historically been the Rails default, but there's no real reason not to use npm at this point. But your project should use one or the other and stick with it, so the lockfile stays up-to-date. If you have a package-lock.json, use npm. If you have a yarn-lock.json, use yarn. If you have both, pick one with your team, and delete the incorrect lockfile, and ensure the most up-to-date lockfile for the one you do want is committed to your repo. 

```bash
# with yarn
yarn remove @rails-ujs
yarn add @hotwired/turbo-rails
## you may not have this; remove it if you do
yarn remove jquery-ujs

# with npm
npm uninstall @rails-ujs
npm add @hotwired/turbo-rails --save
## you may not have this; remove it if you do
npm uninstall jquery-ujs
```

In your `app/assets/javascripts/application.js`, get rid of Rails UJS and add/initialize Turbo:

```diff-javascript
- import Rails from '@rails/ujs';
- Rails.start();
+ import "@hotwired/turbo-rails";
```

If your application.js looks like this instead, do this:
```diff-javascript
- require("@rails/ujs").start();
+ require("@hotwired/turbo-rails");
```

You could [install turbo-rails as a gem](https://turbo.hotwired.dev/handbook/installing) if you want instead; I haven't tried that. 

Now we need to change other stuff in our code to make sure everything is still working. Read on!

## `link_to` Special Powers

### REST Method 
Anchor tags (`<a>`) can only make GET requests when clicked - but in Rails, you may be used to using the `link_to` helper when you want something styled like a link that actually makes a POST, PATCH, or even DELETE. Rails UJS made this happen without the developer needing to think too hard about it by using the `method` parameter on `link_to`. Turbo can do the same thing, but you'll need to update all your `link_to`s to keep them working. 

```diff-ruby
- link_to 'Update', update_thing_path, method: :post
+ link_to 'Update', update_thing_path, data: { turbo_method: :post }
```

### Data-Confirm dialogs
If you were using `data-confirm` from Rails UJS to add automatic confirmation dialogs to your links, you'll need to update those, too. 

```diff-ruby
- link_to 'Update', update_thing_path, method: :post, data: {confirm: "Are you sure?"}
+ link_to 'Update', update_thing_path, data: { turbo_method: :post, turbo_confirm: "Are you sure?" }
```

## Button `disable_with` 
My app didn't actually have this in use, but if your app has any form submit buttons using `disable_with`, that also is a Rails UJS feature that is handled differently by Turbo. Read about [disabling form buttons with Turbo](https://github.com/hotwired/turbo/pull/386) to figure out what you'd like to do instead. 

## Devise error handlers
Does your app use [Devise](https://github.com/heartcombo/devise) for authentication? You will need to make a few [changes to Devise's initializers](https://github.com/heartcombo/devise?tab=readme-ov-file#hotwireturbo) to make sure your sign-in forms still show the error messages they were showing before. 

Note you may need to update your Devise gem, and particularly ensure the `responders` Devise dependency is at `3.1.0` or above.

```ruby
Devise.setup do |config|
  # ...
  # When using Devise with Hotwire/Turbo, the http status for error responses
  # and some redirects must match the following. The default in Devise for existing
  # apps is `200 OK` and `302 Found` respectively, but new apps are generated with
  # these new defaults that match Hotwire/Turbo behavior.
  # Note: These might become the new default in future versions of Devise.
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other
end
```

## Error response flash notices

Do you have code in your controllers that tries to save a model, and renders the partial again with a flash notice if the create/update failed due to model errors? You will need to change the response slightly to keep it working with Turbo. 

```ruby
def create
  @my_model = Model.new(my_params)

  if @my_model.save
    redirect_to my_model_path, notice: "Created a new thing."
  else
    render :new
```

The error branch needs to respond with `status: :unprocessable_entity` in order for Turbo to accept it and show the errors on your form that were working before. 

```diff-ruby
- render :new
+ render :new, status: :unprocessable_entity
```

Make sure to make this change wherever you're doing this pattern in your app - I searched the codebase for `render`; places that are already responding to a form submission with a `redirect` instead of `render` will not need to change.

## Ajax stuff
If you were using `Rails.ajax()` before in JavaScript to make requests that had the proper XSX-CSRF token headers, you'll need to make some changes. My app wasn't. The [Rails guide recommends](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#ajax-requests) using [Rails Request.js](https://github.com/rails/request.js) when no longer using Rails UJS.

## CDN-loaded JavaScript not present in time
Our app used a date range picker that was being loaded from a CDN with a `<script>` element. We encountered a strange issue after switching on Turbo where the code from the CDN wasn't ready when our existing JavaScript tried to initialize the calendar, causing an error in the console and no fancy date picker to appear. Sometimes the date range picker would start working if you navigated to another page and back, though! 

I suspect this has to do with how [Turbo handles script tags](https://turbo.hotwired.dev/handbook/building#working-with-script-elements), but I solved it more quickly than digging in to the details by moving the date picker library directly into our `application.js` bundle (importing it from a `package.json` install) instead of being retrieved from a CDN. 

## JQuery `onReady` events unexpected timings
Our app has a lot of behavior launching from JQuery `ready` events. (Did I mention it's a rather old internal tool?) After turning on Turbo, this code sometimes ran, or didn't, at the wrong times. The [Turbo docs on "installing JavaScript behavior"](https://turbo.hotwired.dev/handbook/building#installing-javascript-behavior) would be a good read here if you're having this issue, too. 

Note that it's not just JQuery `ready` to watch out for - `DOMContentLoaded` and `window.onload` event handlers need to change, too. 

If you use JQuery, all of these are equivalent to the `ready` event handler: 

```javascript
$(handler)
$(document).ready(handler)
$("document").ready(handler)
$().ready(handler)
```

The most inscrutable one if you haven't written a lot of JQuery is that first one, and with an anonymous function inside, it may look like this: 

```javascript
$(function () {
  lotsOfJsStuff();
})

// or with an arrow function: 
$(() => {
  lotsMoreStuff();
})
```

These should all change to be wrapped like this instead: 

```diff-js
- $(() => {
+ document.addEventListener("turbo:load", (evt) => {
```

Turbo's docs note that the `turbo:load` handler code may re-run when the page changes, but the whole page will _not_ necessarily be re-loading like it normally would. So code running in the [handler should be idempotent](https://turbo.hotwired.dev/handbook/building#making-transformations-idempotent), meaning it won't be a problem if the same code runs multiple times on the same page. 

Turbo's docs recommend:
> When possible, avoid using the `turbo:load` event to add other event listeners directly to elements on the page body. Instead, consider using event delegation to register event listeners once on document or window.

To me that sounds like making changes like this: 

```javascript
document.addEventListener("turbo:load", (evt) => {
  $("#my_model_attribute").on("change", () => {
    doSomething();
  });

  // which may also be written, if your jquery is very old..
  $("#my_model_attribute").change(function () {
    doSomething();
  });
}
```
to this: 

```javascript
// we don't need the turbo:load part now

// Option 1, sticking with jquery
$(document).on(eventName, elementSelector, handler);

// Option 2, with vanilla JS
// https://youmightnotneedjquery.com/#delegate
document.addEventListener(eventName, (event) => {
  if (event.target.closest(elementSelector)) {
    handler.call(event.target, event);
  }
});
```

This takes advantage of how events triggered in the browser "bubble up" to the top level looking for an event handler. Events can bubble up to `document` at the highest level, and then inside the handler function, we see if there's an element matching the selector on the page _right now_, and run our handler code if so. This lets you not have to think so much about whether the element you want to handle an event on actually exists on the page at the time your event handler initializing is happening.

Another avenue to solve this problem in a different way is to rip out all that pesky JQuery or vanilla JavaScript event handling and replace it with [Stimulus](https://turbo.hotwired.dev/handbook/building#attaching-behavior-with-stimulus), which pairs well with Turbo and couples interactive behavior and markup more closely and obviously than they might otherwise be.
