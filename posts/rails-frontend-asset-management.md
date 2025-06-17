---
title: Frontend Assets in Ruby on Rails Through the Years
description: sprockets, webpacker, importmaps, jsbundling-rails, propshaft, oh my...
date: 2025-06-17T16:06:00-05:00
tags:
  - posts
  - rails
  - code
layout: post
---
As a Ruby on Rails developer at a [consulting agency](https://www.unabridgedsoftware.com/) who works with a wide variety of legacy apps, there have been many times where I need to change the JavaScript or CSS in use on the site and have to start by figuring out where those assets are currently coming from and how they are getting where they need to go. 

Rails is all about convention over configuration, so there has typically been a "right answer" at any given time about how things like JavaScript and CSS work in a Rails app. But "the Rails way" of handling assets has changed a lot over the years, and it's all too common for a major version upgrade of a legacy app to stop short of upgrading the asset management strategy to what's recommended by that next major version of Rails - meaning knowing you're on a certain version of Rails doesn't guarantee that the Rails Guides relating to asset management for that version of Rails reflect what's actually happening in the legacy app you've been asked to maintain or make changes to. 

After running into this problem a few times I decided to do a deep dive into Rails asset management strategies over the years, and make a reference for myself to guide me towards what asset management patterns are in use in any given Rails app I might encounter. And, I wanted to get a better sense of what the currently recommended patterns are, so I can make stronger recommendations about which upgrades to pursue.
## What do we mean when we talk about assets?

Frontend asset management in Rails means getting JavaScript, css, and static images from the server to the browser.

It includes doing stuff to the JS, CSS, and maybe even images: 
- **bundling**: merging individual source files into one big file to send to the browser
- **minifying**
	- make data as small as possible
	- take out unimportant stuff like whitespace and comments, make variables names tiny
- **compiling**:
	- SCSS to CSS
	- CoffeeScript or TypeScript to JavaScript
	- JSX (like in React) to plain JavaScript
- **transforming**:
	- Babel is a tool that lets you write JavaScript using new features or syntax sugars and it converts it to what older browsers can understand
	- autoprefixer tools for CSS add vendor-specific prefixes (like `-webkit` and `-moz`)
		- Check [caniuse.com](https://caniuse.com/) to find out if this is necessary for you
- possibly **compressing** or **resizing** images
- **hashing** file names
	- This means making the file name unique, typically by appending some generated characters, so you can set a long browser cache time for the file but ensure that the cache is busted if the file contents changes (thus changing the generated characters at the end of the file name, aka resulting in a new file from the browser's point of view)
	- tooling so you don't need to keep manual track of the hashed file names and update your code manually every time

## Timeline of Asset Management in Rails 

Thank you to [this blog post with a timeline](www.fastruby.io/blog/the-assets-pipeline-history.html) which helped me start figuring this out, as well as this [7 year old Reddit post asking about webpacker/yarn/npm](https://www.reddit.com/r/rails/comments/9zg7fe/confused_about_the_difference_between_sprockets/) and this one on [Rails before Sprockets](https://www.reddit.com/r/rails/comments/lfbomu/archeology_what_was_there_before_sprockets/). The [Ruby on Rails History section on Wikipedia](https://en.wikipedia.org/wiki/Ruby_on_Rails) was also quite useful. 

- initial release in 2004: not a lot of JavaScript/css to speak of anyways
- handwaving & gnashing of teeth as JS & CSS became more common but Rails didn't have anything built in
	- assets were placed by hand in the `public/` directory
	- an option existed to concatenate the stuff in `public/` together that sometimes worked
- [Rails 3.1](https://guides.rubyonrails.org/3_1_release_notes.html#assets-pipeline) in 2011: Sprockets-based Asset Pipeline first introduced
- [Rails 5.1](https://guides.rubyonrails.org/5_1_release_notes.html#optional-webpack-support) in 2017: Webpacker gem added to Rails generator as an option
	- Builds on popularity of webpack in the broader frontend world
	- Webpack is not Webpacker, you can think of webpacker as "webpack-rails" because it lets you use webpack more conveniently(?) in a Rails app
	- NPM packages are recommended to be managed using Yarn, an alternative to npm. At the time, yarn had some nice features that npm did not. \[editorial note]: Npm as a package management tool has caught up and as of 2025, is a more typical first choice these days, though legacy Rails projects often still use yarn. 
	- Aside: in 5.1, Rails Unobtrusive JavaScript (rails-ujs) no longer [requires jQuery as a default dependency](https://guides.rubyonrails.org/5_1_release_notes.html#jquery-no-longer-a-default-dependency). Awww.
- [Rails 6](https://guides.rubyonrails.org/6_0_release_notes.html#railties-notable-changes) in 2019: webpacker becomes the default JavaScript compiler for new rails projects
	- Sprockets still used by default for non-JavaScript assets (images and css), and can serve JS if desired
	- Turbolinks and rails-ujs are both installed by default by `rails g`
- [Rails 7](https://guides.rubyonrails.org/v7.0/working_with_JavaScript_in_rails.html) in 2021, Webpacker is retired and importmaps becomes the new default, but jsbundling-rails and cssbundling-rails are named as officially sanctioned alternatives if you need things that importmaps don't provide. 
	- [Sprockets becomes an optional dependency](https://guides.rubyonrails.org/v7.0/7_0_release_notes.html#railties-notable-changes) as `gem "sprockets-rails"`, and is not required by the `rails` gem
	- The [Rails 7 release notes](https://guides.rubyonrails.org/7_0_release_notes.html) in the Rails Guides make no mention of webpacker being dropped in favor of importmaps or the alternatives. Fun!
	- the [official webpacker gem](https://github.com/rails/webpacker) is retired
		- v5 of webpacker will receive security updates on the Ruby side, but no changes on the JS side
		- jsbundling-rails is recommended as a first-choice migration
		- work that was in-progress for v6 moved to independent development as part of the [shakapacker](https://github.com/shakacode/shakapacker) gem; shakapacker can be used as a drop-in replacement for webpacker that will be actively maintained into the future 
	- ["Rails 7 will have three great answers to JavaScript in 2021"](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-JavaScript-in-2021-8d68191b) post by DHH is an interesting time capsule - import maps + Turbo and Stimulus suggested as the new best choice for most Rails apps.
		- Turbolinks + Rails UJS vs Turbo + Stimulus are similar but not quite the same, watch out! See [my recent post on upgrading from rails-ujs to Turbo](/rails-ujs-to-turbo/). 
- [Rails 7.1](https://guides.rubyonrails.org/7_1_release_notes.html#railties-notable-changes) in 2023: adds support for [bun](https://bun.sh/), a tool that can be used as an alternative to webpack & npm/yarn for JavaScript & TypeScript
- [Rails 8](https://guides.rubyonrails.org/8_0_release_notes.html): in November 2024: Asset pipeline via Propshaft instead of Sprockets, and in tandem, use importmap-rails or jsbundling-rails or webpack or esbuilld or rollup.js or ....
	- The Rails Guides emphasize the Asset Pipeline terminology again, but have changed the meaning - before Rails 8, the Asset Pipeline has always had something to do with the Sprockets gem, but in Rails 8, the asset pipeline is handled by a new gem called Propshaft. 
	- The Rails 8 Asset Pipeline (with Propshaft) is more narrowly focused on digesting assets (adding a bunch of characters representing a hash of the file contents, for caching reasons) and putting the assets in the right place to be referenced using those asset digests correctly when using Rails helpers in your views.
	- Migrating from Sprockets to Propshaft may take a bit of work, as Sprockets had more stuff it could do than Propshaft, and if you still want that stuff, you'll need to add another tool and configure it to do those things.
	- it's expected you will probably use importmaps or jsbundling-rails or cssbundling-rails in addition to Propshaft. 
	- Importmap-rails is the primary/default recommendation according to the official Rails guides, but many apps may still prefer to use jsbundling-rails. So which should you choose? Read on...


## What's the big deal about Import Maps?

Import maps are a newly supported way of using JavaScript modules that you can serve as individual files that reference one another, without a bundler and without a big performance hit that you'd have had in the past by serving many small files instead of one big bundle.

They let you use relative imports (`import React from 'react'`) in your code that gets served not-bundled to the browser, and there's a map saying what file `'react'` should point to. The map is important because of the hashing & caching strategy we've discussed - if you update your version of a dependency but don't touch your own code, you want to be able to bust the cache for that dependency only, and not have to update every file that imports it to have the dependency's new digest hash, which would require re-downloading each of those files since their own digest hashes would change. (like if you had `import React from 'path/to/react-asdf11.js'`) 

Head over to MDN for a more detailed [overview on what import maps are](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps). 

For a deep dive on JavaScript modules in general, including the new ECMAScript (ES) modules that give rise to the import map feature now supported by browsers, I highly recommend the [Modules chapter of Exploring JavaScript](https://exploringjs.com/js/book/ch_modules.html#ch_modules), a book I came across while researching for this talk/post that is super duper informative and useful. 

Part of DHH's argument for importmaps is that many of the things that bundlers like webpack can do for us are not as necessary as they were in the past. That is at least somewhat true!

- Modern browsers are evergreen and update automatically to latest versions.
- Browsers that don't auto-update or haven't got the new features have been phased out
	- if your users are in some specific corporate environment that's running really old OSes & old browsers with no updates, you probably know about it; that's thankfully no longer the case for most users
- ES6 (2015) and beyond browser features that were a big improvement in writing JS are handled fine in modern browsers now, so Babel is less necessary.
	- Aside: Dr. Axel Rauschmayer, author of that [_Exploring JavaScript_](https://exploringjs.com/js/index.html) book linked above, also has [_Exploring ES6_](https://exploringjs.com/es6/index.html) that goes really deeply into the new features of ES6 specifically. But the main _Exploring JavaScript_ book also calls out what features are new in ES6 (and later), and would also be a great place to brush up if you learned JavaScript sometime before 2015 and want to catch up on some pretty cool stuff you might not yet have taken the time to study closely. The full text of both is available for free online, but wow they are helpful and you should really consider paying Dr. Rauschmayer if you find them useful!
- vanilla CSS has new features that make writing CSS easier, so writing in SCSS/Sass is less of an advantage.
- if you're writing TypeScript or using React, you do still need to compile before serving to the browser; that hasn't changed.
- HTTP/2 means you can send lots of small files without a big performance hit
	- in the past, serving one big JS bundle helped performance
	- With HTTP/2, doing that can actually be a performance hindrance!
	- The new way is to send multiple smaller files, add a hash to the file name (to make a unique file name that lasts forever) and let each file be cached indefinitely. The file name changes when the asset changes, breaking the cache
	- Import maps rely on HTTP/2 being widely adopted by browsers in order to be a good idea.

### What's HTTP/2? 

HTTP/2 is part of the story of why Rails is moving towards Propshaft + Import Maps as the way of the future. But what even is HTTP/2? 

HTTP/2 is an update to the HTTP protocol that was [supported in all major browsers by the end of 2015](https://caniuse.com/http2). Before that, there was HTTP/1.1

- HTTP/1.1: browser opens one TCP connection which involves an expensive server round-trip, then files are sent one after another, synchronously.
- HTTP/2: browsers can send multiple files at once, without waiting for the previous files to finish downloading
	- also is better at compression than HTTP/1.1 
- As it's a change to the actual HTTP protocol, both the client side (browser) and server side must support HTTP/2 and have it enabled for it to work
- As of May 2025, about [33.2% of websites use HTTP/2](https://w3techs.com/technologies/details/ce-http2), including about [93% of websites using Ruby as a server-side language](https://w3techs.com/technologies/breakdown/ce-http2/programming_language).
- This [2017 post from A List Apart on performance in HTTP/2](https://alistapart.com/article/the-best-request-is-no-request-revisited/) was a quite helpful read for me. "The Best Request is No Request" remains true; if you don't need some specific JS & CSS, don't serve it! 
- Heroku added [beta support for HTTP/2 in May 2024](https://www.heroku.com/blog/heroku-http2-public-beta/). It became [generally available in November 2024](https://www.heroku.com/blog/router-2dot0-http2-now-generally-available/), as part of a feature called Router 2.0. 
	- It included HTTP/2 support between the browser and the Heroku router, and then Heroku's Router forwarded HTTP/1.1 requests on to your app server running on the dynos.

Okay, but now it's 2025, how do I know if I am using Router 2.0 on my Heroku app? 
[Check the HTTP headers of your Heroku site](https://www.heroku.com/blog/tips-tricks-router-2dot0-migration/#http-headers): 

````bash
curl --head https://your-domain.com
````
`curl` will show you whether you're using HTTP/1.1 or HTTP/2 even if you're not on Heroku, but you're on your own to figure out how to turn it on there if you're not.

To turn it on on Heroku:

```bash
heroku features:enable http-routing-2-dot-0 -a <app name>
```

## Clues about what your app is using for frontend assets: 

Bookmark this! :) You'll thank me later. 

### [Sprockets](https://github.com/rails/sprockets/tree/main?tab=readme-ov-file) 
- `gem 'sprockets', 'sprockets-rails', 'sass-rails'
- `config/assets.rb`
- Main folder is `app/assets`
	- main file, beginning in Sprockets 4: `./app/assets/config/manifest.js`
- uses comment directives
	```js
	/* Multi-line comment blocks (CSS, SCSS, JavaScript)
	 *= require jquery
	 */
	
	//= require bootstrap
	//= require_tree some_folder
	```
- `<%= stylesheet_link_tag "application" %>
- `<%= javascript_include_tag "application" %>
- [Sprockets 4](https://github.com/rails/sprockets/blob/main/UPGRADING.md#manifestjs) can do Babel transpiling (without webpack being involved)
	- Look for:
		- `gem 'babel-transpiler`
		- js assets with the extension `.es6` like ` app/assets/JavaScript/application.es6` 
	- I've never actually seen this in an app, but maybe I will some day! 
- asset helpers like `image_url('logo.png')` 

### [Webpacker](https://github.com/rails/webpacker) ([Shakapacker](https://github.com/shakacode/shakapacker))
Remember: 
- webpacker is a Rails-specific thing for using webpack
- [webpack](https://webpack.js.org/) is the name of the JavaScript tool. 
- webpacker gem is deprecated
- shakapacker gem is actively maintained & is a drop-in replacement for webpacker

- Main folder is `app/javascript`
	- `app/javascript/packs` has webpack entry files, like application.js and application.css
	- pack file (application.js) uses `import` or `require` to load the files you want
- `<%= stylesheet_pack_tag "application" %>
- `<%= JavaScript_pack_tag "application" %>
- `package.json` lists the npm packages you are using and might define some scripts you can run with `npm` or `yarn run`
- `bin/webpack-dev-server` watches for changes & rebuilds while the app is running, during development
- `bin/webpack` does a single build & exits 
	- `bin/shakapacker` ; shakapacker replaced the deprecated webpacker gem
- `config/webpacker.yml` is a webpacker-specific config file that lets you set up stuff that a normal webpack project would put in `webpack.config.js`
- Config files for other stuff that you might have:
	- `babel.config.js`
	- `postcss.config.js`
	- `.browserslistrc` - target browsers used by Babel or maybe also Postcss; can be defined in your package.json instead 
- `webpacker:compile` task added to `bin/rails assets:precompile`
	- compiles the packs and places them in `public/packs`

#### Yarn or NPM for package management? 
If you see a  `package-lock.json` in your project, use `npm` commands, like `npm install`. 

If you see a `yarn.lock`, use `yarn`. 

If you see both of these files, pick one together with your team, delete the file corresponding to the other tool, and make sure the lockfile for the tool you pick is up-to-date and committed to your git repo. Pay attention to your PRs to make sure the opposite file doesn't get checked back in at some point. 

\[editorial advice] If you are undecided on which one to use, just go with npm. Use a Node version manager to make sure you're on the right version of Node for your project; I like [nvm](https://github.com/nvm-sh/nvm). It's like rbenv or rvm, but Node. 

### [Asset Pipeline with Propshaft](https://github.com/rails/propshaft/)
- `gem 'propshaft'`
- asset helpers just use `url()`, like `url('logo.png')` (as opposed to `image_url('logo.png')`) 
- can also use `image_tag` to get images from `app/assets/images`
- Might also have jsbundling-rails or cssbundling-rails, or use importmaps 
- Main folder for assets is `app/assets`
- `<%= stylesheet_link_tag "application" %>
- `<%= javascript_include_tag "application" %>
- ES6 modules: `<script type="module" src="main.js"></script>` in your layout file
- `.manifest.json` is automatically generated and looks like this:

	```json
	{
		"application.css": "application-6d58c9e6e3b5d4a7c9a8e3.css",
		"application.js": "application-2d4b9f6c5a7c8e2b8d9e6.js",
		"logo.png": "logo-f3e8c9b2a6e5d4c8.png"
	}  
  ```

### [Importmap-rails](https://github.com/rails/importmap-rails)
- `gem importmap-rails`
- `config/importmap.rb`
	- lines like this: `pin "@rails/actioncable", to: "actioncable.esm.js"` 
- `<%= JavaScript_importmap_tags %>` as well as `<script type="module">import "application"</script>`
- `app/javascript/application.js` 

### [Jsbundling-rails](https://github.com/rails/jsbundling-rails) 
- `gem jsbundling-rails`
- `app/assets/builds/` folder that is gitignored
- `app/javascript/application.js` as the entrypoint
- Some other bundler & its config files: may be [Bun](https://bun.sh), [esbuild](https://esbuild.github.io), [rollup.js](https://rollupjs.org), or [Webpack](https://webpack.js.org)
- `<%= javascript_include_tag "application" %>` if using the asset pipeline 
- `JavaScript:build` task attached to `assets:precompile` which runs the build script that's defined in package.json

## So which should I use? 

These are my bottom-line recommendations; follow them at your own risk.
### Use jsbundling-rails if:
- You want standard JavaScript build tooling like: esbuild (newer, nice) or webpack (very powerful, challenging to configure and keep various dependencies in sync. 
	- or bun? but you're a Rails developer, so I have a hunch you don't know what that is and don't necessarily care to find out.
- If you wanna do some stuff to your JavaScript and also some stuff to your CSS
	- to use ES6+ features and get support in older browsers (check [caniuse.com](https://caniuse.com)!)
	- to use TypeScript or JSX (React)
	- want a bundler to do optimizations like tree-shaking and minification
		- you're using [Tailwind CSS](https://tailwindcss.com/)
### Use importmap-rails if:
- all your users use up-to-date modern browsers. 
- Your users aren't overly concerned about bandwidth
- Your code does not require any JS transpiling or bundling
	- you're writing plain JavaScript or CSS, no TypeScript or React, no Tailwind, no Sass
- hopefully minimal configuration once it's working
- It's a newer strategy with fewer resources for any rough edges
	- Rails-only tooling & resources
- You will have a CDN serving your static assets, not serve them directly from your Rails server directly to your users.
### Migrate from webpacker to shakapacker if:
- You want the smallest possible migration step from Webpacker (which is deprecated) to something else that still uses webpack and functions basically the same. 
- This is an option to consider if you want to spend a bit less time than to set up jsbundling-rails, but you'll probably want to move to jsbundling-rails eventually anyways. 

## Recommendation: just ignore these

### cssbundling-rails
- like jsbundling-rails, it requires you to have Node.js on your system.
- jsbundling-rails can do CSS & JS; cssbundling-rails can _only_ do CSS stuff.
- Use it if you're using Tailwind CSS or need to make your Bootstrap CSS have your own variables, no JavaScript stuff
- you want to use PostCSS or Dart Sass, but do _not_ need any fancy JavaScript stuff
### tailwindcss-rails
- you just want to use Tailwind CSS but don't want to have a Node dependency
- No JavaScript stuff
### dartsass-rails
- you want to use Sass for CSS, but no node dependency
- No JavaScript stuff
