---
layout: post
tags: ["posts", "eleventy", "code"]
title: "Getting your bearings in an existing Eleventy project"
description: "Questions to ask to start making changes quickly"
date: 2021-07-26
redirectsFrom: "/posts/2021-07-26-navigating-11ty-projects/"
---

There are some great tutorials out there on building your own Eleventy site from scratch, but what if you are planning to make some contributions to an Eleventy site that already exists? Maybe it's a site originally built by other people at your company, or maybe it's your own site and it's gotten a bit dusty since the last time you opened up that folder on your computer. In this blog post, we'll take a look at some questions you might ask about an existing Eleventy project, and how to answer them. The goal is to help you start contributing quickly to an existing Eleventy site.

## Where is the Eleventy config file?
By default, the project's main config will be found in a file called `.eleventy.js`. The way to change this is through command-line arguments, so check `package.json`'s scripts for any `start` or `build`-related scripts that are passing in a different file name to the `--config` option. 

This file is your source for all the project's custom configuration - perhaps give it a quick scan when you're encountering an unfamiliar Eleventy project, and see if anything in the config stands out.

## What is the site's output directory?
By default, this is `_site/`. If there's a folder called `_site/`, there's a good chance that's the build output directory.

If you don't see `_site/`, the [output directory](https://www.11ty.dev/docs/config/#output-directory) could be defined at run-time with the command line flag `--output` (check `package.json`'s scripts for this) or in the Eleventy config file, in a returned object with the key `dir` and the inner key `output`. 

*Remember!* Whatever the output directory is named, don't manually edit any files inside that folder. Instead, control what goes into the output directory through manipulating the templates, data, and configuration files that are located everywhere else in the project except in the output folder. 

## What template languages can I use?
If this is an existing project, you'll probably want to use whatever template languages are already in use. File extensions are a key indicator here - .njk for Nunjucks, .liquid for Liquid, .md for Markdown. 

If you want to know all the [template formats](https://www.11ty.dev/docs/config/#template-formats) that are supported, check the config file for the value being set for `templateFormats`, or passed in as an array or a string of comma-separated values to `setTemplateFormats` - these are all the formats that are currently supported by the project, and this is where you'd add a new format if you need to use a format that isn't included yet. 

## Where are the layouts defined?
By default, layouts are found in the `_includes/` directory in Eleventy, but like most everything else, the [directory for layouts](https://www.11ty.dev/docs/config/#directory-for-layouts-(optional)) can be changed in the Eleventy config. 

It's common for each individual page to define a `layout` key in its frontmatter, and the value points to a file in `_includes/` or the custom layout directory. Note that the filename is optional here. 

Layouts can be defined using aliases instead of file names; look for calls to [`addLayoutAlias`](https://www.11ty.dev/docs/layouts/#layout-aliasing) in the config file to find out what file the alias is pointing to. 

Layouts can also be specified for an entire folder (or even for a set of subfolders!) by relying on Eleventy's data cascade.

Here's an excerpt from the docs on [directory and parent directory data files](https://www.11ty.dev/docs/data-template-dir/) with examples of what the filename might be: 

<blockquote>
Directory Data File (data applies to all templates in `posts/subdir/*`)

    - posts/subdir/subdir.11tydata.js
    - posts/subdir/subdir.11tydata.json
    - posts/subdir/subdir.json

Parent Directory Data File (data applies to all templates in `posts/**/*`, including subdirectories)

    - posts/posts.11tydata.js
    - posts/posts.11tydata.json
    - posts/posts.json
</blockquote>

The frontmatter for an individual page file will also be merged with any data attributes defined in `filename.11tydata.js`/`filename.11tydata.json` (where the original file is `filename.*`). I don't see this very frequently, but if you see any `11tydata` files in your project, that's what's going on. 

## Is CSS being compiled? If so, how?
People who worked on your project before you might have written CSS directly, or maybe they wrote SCSS or LESS and used some scripts to transform it to CSS for shipment to the browser. Ideally, the way that styling happens in this project is described in the readme, but if not, don't worry! First, look for style files that have an extension different than `.css`. If there are some, look for where the transpilation script might be defined.

Some places to check are: 
 - in `package.json` scripts, look for scripts that use `gulp` or `grunt`. If there is one, look for the `gulpfile` or `gruntfile` (the config for whichever build tool) and see if there are tasks defined inside for running CSS. The `gulp` or `grunt` tool might run automatically, or you might have to run it yourself after making changes to the style files. 
 - in the config file, in a [`beforeBuild`](https://www.d-hagemeier.com/en/articles/sass-compile-11ty/) event with code inside the event handler that does the transpilation.

 However style files get transpiled, pay attention to what the output directory for styles is - maybe they get written directly to the site's output directory (`_site`), or maybe they get written to some other directory that is then passed through to `_site`. You want to be sure to modify only files that aren't going to be overwritten by the build processes later on. (So, modify only the inputs to transpilation, not the output or intermediate files.)



