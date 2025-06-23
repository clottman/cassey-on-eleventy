---
layout: post
title: Setting an environment variable you only care about in local dev in Rails
tilTags: ["ruby", "rails"]
description: "here's what I am doing"
date: 2025-06-23T17:17:00-05:00
---

I am working with a Rails app where I want to add a configuration setting to disable some behavior that interacts with a third-party API, which may not be available for real in the local dev environment, but will always be enabled & actually being hit in production and staging. 

This app is using the [dotenv gem](github.com/bkeepers/dotenv) to manage configuration via `.env` files, and at first I was going to do that. But I wanted to make sure that if my new config value was not set in some environment, that it wouldn't cause issues. Basically, I don't want to have to touch the prod environment variables (managed in our hosting provider) at all and have it keep working the same way, but be able to turn my new value off & on in local dev. I also want to have one place to set the default for the environment - using `ENV.fetch` with a default value to fallback on would mean that I'd need to remember what the default should be everywhere I want to access the variable, and also keep all those places in sync if I want to change the default later.

I eventually decided to add the value I wanted to be the default to `config/application.rb`, and in `config/development.rb`, I override that value by reading from the `ENV` as set by dotenv.

```ruby
# config/application.rb
config.sync_to_remote_calendars = true
```

```ruby
# config/development.rb
config.sync_to_remote_calendars = ENV["SYNC_TO_REMOTE_CALENDARS"] == "true"
```

```ruby
# where I want to read the value, to disable the behavior unless my setting is true
return unless Rails.configuration.sync_to_remote_calendars
```

```yaml
# in my local .env & .env.example
# .env values will always come in as strings with dotenv, not booleans
SYNC_TO_REMOTE_CALENDARS=true
```


