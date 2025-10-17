---
layout: post
title: Migrating a Rails app from Webpacker to jsbundling-rails with Webpack
tags:
  - posts
  - code
  - javascript
  - rails
description: "4000+ words of sharp edges I ran into so maybe you won't poke yourself on them too"
date: 2025-10-17T11:31:00-05:00
---
Recently at work I undertook a project to migrate a client's decade-old Rails app from using Webpacker to compile & bundle frontend assets, to using jsbundling-rails with Webpack. The app is big and fairly complex, and the project ended up taking much longer than I had originally anticipated. But it's done and I'd like to document a few of the gotchas I ran into a long the way! 

## migrate who to whatnow
Consider checking out my previous post that has [an overview of Ruby on Rails-blessed asset management approaches over the years](/rails-frontend-asset-management). The research I did for that post laid a great foundation for me in this work, and helped me feel more confident at helping the team choose a new approach to migrate to since [Webpacker](https://github.com/rails/webpacker) is no longer officially maintained. 

[Webpacker](https://github.com/rails/webpacker) was a Ruby gem for integrating [Webpack](https://webpack.js.org/) (the javascript build tool) with a Rails app specifically. It attempted to abstract a lot of the details of configuring Webpack into a set of reasonable defaults that would probably work for a Rails apps, with the option to further customize via Rails-conventional config files instead of the standard config files that webpack-js uses. This supported the general Rails guiding principle of convention over configuration, but in practice, was a bit of a mess. It often was necessary to look at both the documentation for Webpack itself, then translate that into the special case of what Webpacker may or may not be doing already and how Webpacker wanted the config to be defined vs what was shown in the Webpack docs. 

Webpacker is no longer officially maintained by the Rails team, and there are a few migration options possible (again see [my previous overview](/rails-frontend-asset-management) for more details!).   The most straightforward, and most likely to need to be migrated to something else again later, would have been to swap out webpacker for [shakapacker](https://github.com/shakacode/shakapacker), a still-maintained-as-of-now tool that works essentially the same as webpacker. The least straightforward option would have been to jump straight to [importmap-rails](https://github.com/rails/importmap-rails), which would have been a poor choice at the moment for an app that uses a lot of React, and is running Rails 6. (Updating the javascript tooling was a big part of helping us get ready for Rails 7, though!) So, we decided to migrate to [jsbundling-rails](https://github.com/rails/jsbundling-rails) to handle the integrating-with-Rails parts, and stick with Webpack over the more modern esbuild in order to hopefully not have to touch much actual Webpack config and move more quickly.

In hindsight, I wish we had went ahead and switched to esbuild - it seems more documentation and "here's what I did" blog posts or Q&A are out there for jsbundling-rails and esbuild vs Webpack, and I spent much more time fiddling with the new Webpack config than I would have preferred. Webpack configuration is notoriously complex, and I was frustrated by parts of the documentation, like for when an option was going to use a file path, figuring out what the file path would be read as relative to - the location of the config file? the place the webpack process was run from? the `context` option in my config?

It's worth noting too that the Rails app was already using [Sprockets](https://github.com/rails/sprockets/tree/main?tab=readme-ov-file), as that's what "asset pipeline" has meant in versions of Rails [prior to Rails 8](/rails-frontend-asset-management/#timeline-of-asset-management-in-rails), where "asset pipeline" starts meaning the PropShaft gem instead of the Sprockets gem. Sprockets can do a [bit more than PropShaft](https://guides.rubyonrails.org/asset_pipeline.html#sprockets-vs-propshaft), like compile & minify some javascript & [Sass](https://sass-lang.com/) on its own, and process Ruby code in ERB that might be in those JS & (s.)css files. I thought not migrating to PropShaft would save time and effort; I ended up running into some issues where Sprockets conflicted with behavior Webpack was already handled that made me wish we were just moving to PropShaft which would stick to the asset-digesting lane only and nothing else.

## Getting Started
To get started, I followed the guide from jsbundling-rails to [switch from Webpacker 5 to jsbundling-rails with webpack](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md). The first few steps were really straightforward! Remove some gems, add some others. However, for various reasons, at least in our app, it was hard to see it all working til much later in the process, after many more issues were resolved. 

The [CSS & JS section](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md#optional-css--sass) doesn't say anything about what if you were using the asset-url helper before (see more detail on that later in this post). 

The [fonts & images](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md#optional-fonts-images-svg) section doesn't mention you'll need to switch any of the uses of those images from `image_pack_tag` to just `image_tag`, but you'll need to do that. I ended up moving all the images to Sprockets' domain and leaving out `file-loader` (which is deprecated anyways in Webpack, in favor of using something called [asset modules](https://webpack.js.org/guides/asset-modules/) instead). See the "Image Assets" and the "Sprockets asset_path helper gotcha" sections below. 

When you're at the [use webpack to chunk assets](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md#optional-use-webpack-to-chunk-assets-so-that-it-works-with-sprockets) section, you might face the [Sprockets issue described here about dashes in file names](https://github.com/rails/sprockets/issues/749), but I did not. Including the link though because I thought it might be a source of some of my problems, and it was good to identify whether or not that was true. 

In the final section on [support for development environment](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md#optional-add-support-for-development-environment), you see that NODE_ENV is being read, but how are you getting that NODE_ENV to be set? And do the sourcemaps you'd like to have actually work? Read on, my friend.

## Image Assets
Previously in the app I migrated, some image assets were served by Sprockets only and used the `asset_tag` helper, and some were first processed by Webpacker, and used the `asset_pack_tag` helper. I decided it would be simpler to have all image assets served this way (and PDFs, and any other frontend static files not destined to become a CSS or JS file) handled only by Sprockets, and leave Webpack out of it entirely. This worked pretty well, but lead to an issue where previously some Sass files were able to use the `asset-tag` helper provided by Webpacker (or Sprockets?) to get asset URLs, but that helper was no longer available because the CSS files handled by Webpack didn't know anything about the Rails environment or how Sprockets was going to add a hash/digest to the asset filename. This is behavior that has a [replacement in cssbundling-rails & Rails 7](https://github.com/rails/cssbundling-rails/issues/22#issuecomment-1955219066), but as far as I can tell, does _not_ work with jsbundling-rails. 

This was a surprise - I expected based on docs and the research I did before that jsbundling-rails would behave more like a superset of cssbundling-rails, with all the Rails-integration features that cssbundling-rails had, plus some extras to let you use a Node-based bundler tool. This seems to be at least one behavior in cssbundling-rails that doesn't have an exact counterpart in jsbundling-rails.

I puzzled for a bit about what to do, and eventually settled on having my Webpack-generated CSS output file have the extension ".css.erb", and I wrote the URL I needed as an ERB-containing string in the .scss file where it was needed. 
```css
background: "<%= asset_url('fancy-design.png') %>";
```
Then when Sprockets tried to fulfill `stylesheet_link_tag("application")`, it found `application.css.erb` in the Webpack output directory I told it about, and happily did its Sprockets thing of turning that into a simple `application.css` with the ERB turned into the actual URL I needed for that CSS background declaration.[^1]

## Replacing Webpacker-React
The app I upgraded used a decent amount of React, but in a very Rails-y way: instead of a single React `<App/>` that was rendered on every page and was responsible for most of the frontend HTML, most of the app views were in regular Rails view templates/partials. When a page needed a React component, the component for that page was loaded onto a particular element using a gem called [Webpacker-React](https://github.com/renchap/webpacker-react/). 

Webpacker-React would let you call a view helper like 
`react_component('Hello', {name: "My Name"})` that would render a React component like `<Hello name="My Name" />` at that location. Neat!! 

But as you might expect, continuing to use Webpacker-React is a bit complicated when you are removing Webpacker. The original author of Webpacker-React [originally intended to deprecate it](https://github.com/renchap/webpacker-react/issues/132#issuecomment-1029009452) following Webpacker's phase-out. But, then they started work on a new version that would both rename, and at least partially, rewrite the gem to not depend on Webpacker.

Because, as you might _not_ expect, it turns out that Webpacker-React didn't _actually_ require Webpacker specifically all that much, even though Webpacker was listed as a required peer dependency in the gem. [The rewrite](https://github.com/renchap/webpacker-react/pull/139) kept most of the functionality untouched, but with a more modern javascript setup. The gem name changed from webpacker-react to react-component-rails, signaling you could make your React components into plain javascript however you wanted. Unfortunately, work on this branch stalled in 2022 with version `1.0.0-beta.4`, but we were able to use it at that version anyways. 

However, there was an issue using it with older React versions, and despite a [workaround other people reported worked for them](https://github.com/renchap/webpacker-react/issues/147), we bumped our React version to 18 in order to keep our components working with `react-component-rails@1.0.0-beta.4`. We did need this line still in our `webpack.config.js`:

```js
resolve: {
  alias: {
    "react-dom/client$": "react-dom",
  }
}
```

### Railtie.rb gotcha
After replacing the webpacker-react gem with react-component-rails@1.0.0-beta.4, I got a really weird error at application startup, where another gem in use by the app wasn't getting loaded properly. It was really weird and seemed totally unrelated to anything I was actually doing around frontend assets. Clearly something had changed about the loaders or some config setting, but what was it?

Eventually I traced it back to a naming conflict with the way Ruby's load path works. 

I'm struggling to find an authoritative source on this, so I don't have a link here (feel free to send me one to add if you find one!), but when you're using `bundler` for your gems, the way it works is that all individual files that are a direct child of `lib/` from each gem you're using will be added to the Ruby `$LOAD_PATH` of your app. 

A best practice for creating gems is to have just one file there as a direct child of `lib/`, perhaps matching the name of your gem, so that users can do `require 'my-gem'` and get exactly what `my-gem` wants that to mean. 

Any of `my-gem`'s files that its `lib/my-gem.rb` depends on should be grouped within `lib/some-other-folder` and namespaced like `MyGem::MySupportingClass` in order to avoid polluting the namespace. Namespace pollution is when multiple source files are trying to stake a claim on some common name, such that, furthering this example, when somewhere in the app tries to do `require 'my-supporting-class'`, the wrong file is required - we get OtherGem's version of MySupportingClass when it should be MyGem's version. To avoid this, `lib/my-gem.rb` should instead  `require 'my-gem/my-supporting-class'`, because it's pretty unlikely that another gem would ask for one of the files _it_ needs by that exact name.

In the case of react-component-rails, unlike in webpacker-react, there is a file named [`railtie.rb` right there as a direct child of `lib/`](https://github.com/renchap/webpacker-react/pull/139/files#diff-13eca9dcbb2b70753e70b8fd22ef4fe4ea1e8f2cadfa944a573db174c422374c), not inside another folder and namespaced properly. We happened to already use an important-to-us gem that made that same namespace pollution error, with a file named the same thing. So when we did `require "railtie"` in our gem, we got the wrong `railtie.rb` and stuff that would normally be included by that gem didn't work.

Since the conflicting gem in our case was under our team's control, we solved this by moving `lib/railtie.rb` to `lib/our-gem/railtie.rb`, so the clash no longer happened. It could again, though, if we ever happen to add another gem that makes this same mistake with that exact file name. (Not out of the question; `railtie.rb`, as you might expect, is not an uncommon file name for gems for use in Rails!)

## Sprockets `asset_path` helper gotcha
One interesting[^2] thing I found when moving more assets to live in Sprockets-land only, not Webpack-land, was that the `asset_path` helper behaves differently depending on where it is coming from.

If you need an `asset_path` or `asset_url` in code outside of a Rails controller or view (such as perhaps, a [View Component class](https://viewcomponent.org/), you need to include a module that contains it. If you `include ActionView::Helpers::AssetUrlHelpers` to get it, your paths and urls won't contain the Sprockets-appended file digest, and you'll get a 404! (in environments where asset digesting is happening - which may not include your dev environment. Have fun!) Instead, you should use `ActionController::Base.helpers.asset_path` and  `ActionController::Base.helpers.asset_url`, and then you'll have the digests you (may, at least in prod) need.[^3]


## Enabling Source Maps
The jsbundling-rails guide on migrating from webpacker suggested that I could have source maps, optionally. Yay! I do want those.[^4] But in practice, I kept getting 404s in my browser developer console for sourcemap files. Hmm. I thought maybe the [devtool](https://webpack.js.org/configuration/devtool/) I was setting in the Webpack config could be the problem, and tried several of them. Nope. Then I was a bit stumped for a while. I thought maybe that [Sprockets name-collision](https://github.com/rails/sprockets/issues/749) issue could be the culprit, but adding the [suggested hotfix initializer code](https://github.com/rails/sprockets/issues/749#issuecomment-1810139673) didn't seem to help. 

Eventually, I realized that my source maps were getting written out just fine by Webpack, but then Sprockets was helpfully trying to add _its own_ source map based on  `app/assets/config/manifest.js`. Sprockets put its sourcemap URL at the end of the file, where my browser read that last line and took that as the source map to use. Reasonable, right? Except because `manifest.js` was just passing through `//= link application.js` which Webpack had already compiled, the source map didn't give anything very useful - if the source map was picked up by the browser, it didn't make stepping through the JS any more clear than it was, because the map just pointed at the big Webpack-compiled-and-minified one-liner anyways.

I solved this by making sure to set `config.assets.debug = false` in my `config.environments.development.rb`. With `debug = false`, Sprockets didn't attempt to make and serve its own sourcemap, so my Webpack sourcemap "won" as the sourcemap used by my browser, and thus I had actually useful sourcemaps again. 

## Assets-related Rails config settings
Related to the sourcemap issue we just covered, a frustration throughout this project was the somewhat inscrutable nature of what all these assets-related config settings were actually doing:[^5]  
```ruby
assets.quiet
assets.debug
assets.raise_runtime_errors
assets.compile
assets.css_compressor
assets.js_compressor
```

Even `assets.precompile`, a pretty important setting, behaved confusingly. I want all the stuff in my manifest.js to be compiled, right? So if I am precompiling assets with `bin/rails assets:precompile`, why do I need to define all the things that will then be precompiled in this initializer setting, rather than Rails figuring it out from my `manifest.js`? I did not actually figure out why this duplication was necessary or how to avoid it if that's possible. Again it's probably one of those things that if Sprockets was the ruler of all things frontend-assets, like before Webpacker came around, we'd all just know and remember when we were adding new files. But that knowledge has atrophied, and the documentation around it (if it ever existed) seems to have, too. 

To figure out the source map issue, I pieced together clues from this doc on [How Sprockets Works](https://github.com/rails/sprockets/blob/main/guides/how_sprockets_works.md)[^6], and this one on [extending Sprockets](https://github.com/rails/sprockets/blob/main/guides/extending_sprockets.md). Surprisingly, I didn't find anything really useful in this one on [Source Maps](https://github.com/rails/sprockets/blob/main/guides/source_maps.md) :D since it mainly explains the concept of a source map and some more browser-centric and algorithm-y details of how source maps work, and not how they work in Sprockets, specifically. 

At some point in reading those I tried setting `assets.js_compressor = nil` in the initializer, but that didn't fix my source maps. 

However, the section on [asset generation in development](https://github.com/rails/sprockets/blob/main/guides/how_sprockets_works.md#asset-generation-in-development) of How Sprockets Works gave me a clue that the `debug` pipeline in Sprockets was what was adding in something called "SourceMapCommentProcessor" and thus creating the issue that made me not have working source maps. I tried unsuccessfully to clear out the debug pipeline in Sprockets to do nothing, but instead, since SourceMapCommentProcessor is in fact the only thing that the `debug` pipeline actually does, that pointed me to the final answer: setting `assets.debug = false` in my development environment where I wanted to see the sourcemaps. 

## Rails Env vs Node Env
With Webpacker, your Webpack config could know stuff about your fully loaded Rails environment settings. With jsbundling-rails connecting to Webpack instead, the jsbundling-rails docs encourage you to run Webpack directly with yarn[^7] aka `yarn run build`, rather than `bin/webpack` or `bin/webpack-dev-server` which are Rails binstubs for running webpack (the Webpacker way). So, when you run Webpack, your Webpack process doesn't know anything now about your Rails env. 

That's okay though, because you can use the npm package [dotenv](https://www.npmjs.com/package/dotenv) to read your values from .env into the executing Webpack process. However, you might already be using a Ruby gem that's also called [dotenv](https://github.com/bkeepers/dotenv?tab=readme-ov-file), and it behaves a little differently! The gem version encourages (or at least allows) you to have [many layers of files with env values in them](https://github.com/bkeepers/dotenv?tab=readme-ov-file#customizing-rails) that cascade to become the final environment values in your Rails app. Some of those files may be committed (not gitignored), with only certain layers of the cascade having secret values and others being plain-text-friendly. The npm package doesn't allow that, and in fact has [sections of its FAQ](https://www.npmjs.com/package/dotenv#-faq) encouraging you to gitignore .env, and _not_ have multiple .env files that cascade together. It even quotes The [Twelve-Factor App guidelines](https://12factor.net/config) to give weight to this argument. I get it, I'm on board - but the app I'm working in already has the cascading multiple file version, and it's out of scope to change that now. 

I need _one_ file max that config values can come from for the Webpack process. Ultimately, I chose to avoid having any npm dotenv use at all, since I really just need the one variable: NODE_ENV, to determine whether to output source maps (and do other prod-related optimizations in Webpack) or not. So, now I have two scripts in package.json, and devs running locally have to remember to use the one that will give them source maps. 

(Note here that jsbundling-rails defaults to using the defined `build` script from package.json for [what's going to happen when you run `assets:precompile` in Rails](https://github.com/rails/jsbundling-rails/blob/7d5afa913bfe1c3d8f4f630ff604660d425ac830/lib/tasks/jsbundling/build.rake#L35), so you can't swap the order of these easily- the local version (not precompiled assets) needs to have a special-cased name and the production/precompiled version needs to just be named `build`.)

```js
"scripts": {
  "build": "NODE_ENV=production webpack --config ./config/webpack.config.js",
  "build:dev": "NODE_ENV=development webpack --config ./config/webpack.config.js"
}
```

## jsbundling-rails & devDependencies
When it was time to build the app in the CI environment, I ran into an issue where packages that were clearly listed as dependencies in package.json were reported by the build process as not being present - specifically in my case, `webpack-cli` had gone missing. `webpack-cli` was listed in `devDependencies` in package.json, but that's no problem, because I had told the CI script to run `yarn install --production=false` to ensure those devDependencies got installed. (I could have also used `NODE_ENV=development yarn install`, but I wanted to skip source maps in CI.) So why was `webpack-cli not found`? 

I eventually figured out that even though there was a `yarn install` step explicitly in our CI setup, when we did `assets:precompile` for the CI/test run, jsbundling-rails [does its own `yarn` (or `bun`) `install`](https://github.com/rails/jsbundling-rails/blob/7d5afa913bfe1c3d8f4f630ff604660d425ac830/lib/tasks/jsbundling/build.rake#L18) unless you've set `ENV["SKIP_YARN_INSTALL"] || ENV["SKIP_BUN_INSTALL"]`. And it will only do `yarn install` (or the install for a different tool like bun, npm, or pnpm if it can find those instead), no customizing of the NODE_ENV or `production=false` flags. 

So, if you're using jsbundling-rails, you will need to set `SKIP_YARN_INSTALL=true` if some of your required packages (like the ones your Webpack compilation needs, so.. probably anything you're doing in JS in your Rails app at all) are listed in devDependencies. Or, you can do what I ultimately did, and move any packages listed in package.json to plain old `dependencies` and forget `devDependencies` exists at all.
 
## JS modules in strict mode
I'm not entirely sure how Webpacker was getting around this, but one of the npm packages used by our site threw an error after switching to Webpack-without-webpacker that turned out to be because the module was now running in strict mode. The module code in question hadn't changed, and the strict-mode error was correct: the package had some code that was trying to write to a variable that hadn't been instantiated already (with `var`, `let`, or `const`; preferring one of the two latter in modern JS). But somehow, it worked before, and only started erroring when Webpacker was removed. It does seem like "javascript modules are executed in strict mode" is spec-compliant behavior, so it makes sense this needed to be addressed to use it with Webpack, but it was still a surprise since it had worked fine before under Webpacker. 

<br />
Happy migrating, see you in the next era of frontend assets in Rails!
<br />
<br />

[^1]: A PropShaft-savvy reader may wonder what I would have done if I had in fact switched to PropShaft here instead of Sprockets, since PropShaft doesn't have automatic ERB handling the way Sprockets does. I leave that as an exercise for the reader, or future-me when I need to answer that for myself.

[^2]: "interesting" can be translated here in various ways, but should certainly be read in the Midwestern-US accent, with its deeply negative connotation. "enraging" is perhaps a bit too strong; "perplexing", "vexing", and "can I have PropShaft now instead" are all valid substitutions.

[^3]: This difference in behavior did not seem particularly well documented (documented at all?). Perhaps in a time before Webpacker when Rails devs were interacting more closely with Sprockets and relying on it more for what later, Webpacker might be doing instead, this was common knowledge. For now, and for me, it was simply an unhappy surprise.

[^4]: In some of the mid-project despair I tried out "what if we don't have source maps, can we get by without them?" and the answer was unfortunately a very clear and obvious "no".

[^5]: ok `assets.raise_runtime_errors` actually does what it says it will & I like it

[^6]: Reading over this again, the [Directives](https://github.com/rails/sprockets/blob/main/guides/how_sprockets_works.md#directives) section seems to be suggesting that files listed in manifest.js won't need to be in the precompile setting explicitly - that was not my experience though, and any attempt to have files only in manifest.js and not the precompile list gave me big angry error pages.

[^7]: The Rails world still defaults to yarn for the most part, rather than npm or any of its shiny new competitors, for installing node packages & running scripts.
