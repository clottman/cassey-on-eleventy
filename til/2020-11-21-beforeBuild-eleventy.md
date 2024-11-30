---
tilTags: ["eleventy"]
title: "Using the beforeBuild hook to render Sass in Eleventy"
description: "Goodbye, Gulp"
date: 2020-11-21
---

Dennis Hagemeier shared a super helpful post on [how to compile Sass with Eleventy directly](https://www.d-hagemeier.com/en/articles/sass-compile-11ty/), without needing to rely on a build helper tool like Grunt or Gulp. The trick is to use the `eleventyConfig.on('beforeBuild', () => {....})` hook, with Dart Sass to do the compilation..

I implemented it on this site, which you can [see the code for in this PR](https://github.com/clottman/cassey-on-eleventy/pull/9).

In addition to the changes in Dennis's post, I also: 
- installed the required packages I wasn't previously using, and `require`d them. 
- Added `eleventyConfig.addWatchTarget("_sass/");` so that a build will happen whenever my Sass files change. I don't want to add scss as an Eleventy `templateFormat`, because then they'll get passed through as-is to the output directory in addition to being compiled & placed there by the `beforeBuild` hook.

Dennis used `fs.outputFile`, a function that comes from `fs-extra`, instead of the built-in `fs.writeFile`. `outputFile` creates the directory you want to write to if it doesn't exist, which is handy. `writeFile` otherwise threw an error if I deleted my _site directory and tried to run a fresh build, because `_site/css` didn't exist yet.

