---
til-tags: ["ruby", "rails"]
title: "Making Rails recognize code in subfolders of default folders"
description: "In which I learn about autoload paths"
date: 2022-04-15
---

Today I was making some improvements to a client's Rails codebase. This client has many services in the `services/` folder of the Rails application, and a handful of them are related to a specific purpose. I wanted to put these services in their own folder so I can easily find them while I'm workig. 

I created a new folder under `services/` and tried to run the services the way I had been before, but it didn't work. I got an error about `Uninitialized contant MyServiceName`.

I read about [autoloading in the Rails Guides](https://guides.rubyonrails.org/autoloading_and_reloading_constants.html) and learned that by default, a Rails app makes all the code that's a direct child of any of the folders that are present when you bootstrap a new app available to any other code. So, code in `services/service1.rb` can see code in `services/service_helper.rb` without any configuration, and both can be ran from my Rails console. (`bin/rails c`).

When I moved code into a subfolder of `services/`, it's no longer a direct child of that folder and so doesn't get autoloaded. I can change that by adding subfolders of any folder that's there by default to the autoload paths in `config/application.rb`. 

```
config.autoload_paths += Dir[Rails.root.join('app', 'services', '**/')]
```

After I added this line to the config, I had to exit my Rails console instance and re-enter it for my changes to take effect - `reload!` didn't pick up the config file changes. 

But once I restarted my console, I was able to run my service without `require`ing anything special once more.

