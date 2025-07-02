---
layout: post
title: Setting the root route in Ruby on Rails with Devise
tilTags: ["rails", "ruby"]
description: ''
date: 2025-07-02T13:53:00-05:00
---

Recently I was working on a Rails app that previously had two entirely separate log-ins using [Devise](https://github.com/heartcombo/devise), one for external customers and one for internal users. We wanted to remove the login ability for external users.

When there were two separate logins, the app would open up to a Login Selector page, where a user would indicate if they were a client or an employee, and then log in on a specific page for that type. (This was very confusing if, say, totally hypothetically, you clicked the wrong one while working quickly, and now your test user account won't log in and you don't know why. On the plus side, this experience would make you feel so very validated at removing the same-but-different login pages!)

When there were two login areas, we had two `devise_for` entries in `config/routes.rb`, and a `root` setting, like this: 

```ruby
  devise_for :clients,
    controllers: {invitations: "clients/invitations", sessions: "clients/sessions",
                  registrations: "client/registrations"}
  devise_for :users,
    controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  root to: "login_selector#index"
```

I wanted to go down to just having one `devise_for`, and the root page that would be the main user dashboard. But if you're not already logged in, you should get the login page first. 

At first I tried just changing the `root` to the user dashboard action, but that meant that when you were not yet logged in, you'd get blocked by `before_action :authenticate_user!` before you'd hit the controller action for that page.

I thought about adding another controller action that was exempt from the `authenticate_user!` `before_action`, and either returning the user dashboard or the login view depending on if the user was authenticated. But that felt not quite right. 

I found a few different possible answers on Stack Overflow, but none of them worked quite right, or they pointed me in circles to other answers that just linked back to the first one.

The answers mentioned an `unauthenticated` method I could use for routing though, and going straight to the [`unauthenticated` docs](https://www.rubydoc.info/gems/devise/ActionDispatch%2FRouting%2FMapper:unauthenticated) gave me almost the exact thing I needed. 

In the end, my routes file now looks like this: 

```ruby
  devise_for :users,
    controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  unauthenticated do
    as :user do
      root to: "devise/sessions#new", as: :unauthenticated_root
    end
  end

  root to: "users/dashboard#index"
```


