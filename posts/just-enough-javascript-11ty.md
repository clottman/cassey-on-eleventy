---
layout: post
tags: ["posts", "eleventy", "code"]
title: "Just Enough JavaScript for Eleventy"
description: "Want to try Eleventy, but not very experienced in JavaScript yet? You're in the right place."
date: 2021-12-25
social_image: "https://cdn.glitch.com/238f8585-6bd5-40c4-a0ff-2b87d4acea6c%2Fknowledge-256.png?v=1561398158147"
social_image_height: 256
social_image_width: 256
social_image_alt: "a stack of books with an apple on top"
twitter_card_style: "summary"
redirectsFrom: "/posts/2021-12-25-just-enough-javascript-11ty/"
---

Sometimes I hear from people who'd like to try out the well-loved and hip static site generator Eleventy, but their main programming language expertise is in something other than JavaScript and they're worried it will be too challenging to configure and use. This post attempts to bridge that gap a bit - giving you some basic hints about modern JavaScript (aka JS) that will hopefully make the world of Eleventy static site generation feel a little less intimidating. 

## Assumptions/Expectations
 - I'm assuming you have a basic level of familiarity with some programming language. You're broadly familiar with concepts like if statements and loops; importing code from other files, and functions, even if you don't know how to write them in JS yet. 
 - You know that in programming, it's often important to copy code/commands very precisely, and that the exact punctuation often matters a great deal. 
 - This isn't a comprehensive guide to syntax; your best bet when you need to know something like for-loop or if-statement syntax in JavaScript would be to google "mdn for loop" to arrive at the comprehensive and reliable Mozilla Developer Network docs. 
 - This post serves as a complement and not a replacement to the [official Eleventy docs](https://www.11ty.dev/); I'm assuming you also have access to those docs and have perused them at least a little.
 
### Technical Assumptions
 - Eleventy requires you to have version 10 or higher of Node.js on your machine. [Install it](https://nodejs.org/en/) if you haven't already. 
 - As of writing this on 12-25-21, Eleventy's stable version is 0.12.1. Version 1.0 of Eleventy is coming, but is not yet the stable release. I'm writing this post assuming that you're using version 0.12.1. 

### Recommendations
 - Eleventy will let you use basically any template language that you want - if you're coming from Jekyll, you might find Liquid the easiest to use. If you have experience with another template language already, feel free to use that. However, might I recommend giving Nunjucks a try? It's very popular in the Eleventy community, for good reason. The syntax has a lot of overlap with Liquid, but Nunjucks is a bit more powerful: that is, it will let you express more complicated logic in your templates than Liquid will. 
    - Nunjucks (and Liquid, for that matter) syntax differs from JS syntax at times. You will likely need to refer to the [official Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html), for things like how to do a loop in your templates or what default filters (functions for use in Nunjucks templates) are available.

## Some key terms
 - *NodeJS* is a JS runtime. It can be used for servers and network applications, but it also allows you to run JS command line utilities on your computer.
 - *NPM* stands for "Node Package Manager", but confusingly, it has 3 somewhat distinct meanings.
    - NPM is a for-profit company, acquired by GitHub in 2020.
    - NPM is the name of the main JS package repository, which is shepherded by NPM-the-company
    - NPM is also a command-line tool to manage packages in your project and on your computer
 - *yarn* is another tool for managing JavaScript packages
    - you can choose to use it instead of npm if you want
    - initially created by Facebook, yarn had some advantages over npm that are now mostly irrelevant. 
    
## Some key files: 
 - `package.json`: a file that contains metadata about the project like its name and creator info, as well as a list of external packages being used and definitions for scripts that are used to build, run, deploy, or do other things to the code for that project.
 - `package-lock.json` (alternatively, possibly `yarn.lock`): a file that lists exact versions of the packages being used by the app. See the Package Management section for more info. 

## Package Management
Packages are typically installed from the NPM registry and listed in a file called `package.json`. Package installation and upgrades follows semantic versioning by default, though you can override this if you need to pin your project to a particular version of a dependency. Your project will have a lockfile (`package-lock.json`) which tells npm exactly what version to install. 

### Where packages go & git notes
Packages are installed from the online repository into a local directory in your project called `node_modules/`. This folder can get very big and you should never modify what's in it yourself. Most people find it useful to add `node_modules/` to their `.gitignore` rather than committing them to source control. 

Both `package.json` and the lockfile are typically checked into source control. If you're working with others, and both of you installed new packages recently, you might end up with merge conflicts in the lockfile. They can be hard to resolve - but it's typically safe to delete the lockfile entirely and let `npm install` regenerate it for you, then check that in as the resolution to the merge conflict. 

### Install Packages
When a project has a `package.json` already and you want to install all the packages listed in it, run `npm install` from the command line to install everything into your local `node_modules/` folder.

When you want to add a new package, run `npm install packagename`. This will install the package to `node_modules/`, and modify your `package.json` to list the new package so the next time someone runs `npm install`, your new dependency will show up, too. 

### Yarn & NPM considerations
If you're working with an existing project, be sure to use whichever of yarn or npm was already in use. For the purposes of this blog post, I'm assuming you're using npm for package management; the commands for yarn will be slightly different but the effects are basically the same.
 - if there's a file called package-lock.json, use npm.
 - if there's a file called yarn.lock, use yarn. 
 - if there is both, talk with your team about what people are actually using, and try to standardize on one or the other. If not, you'll likely eventually run into headaches with the lockfiles being out of sync. 

## Scripts
Your `package.json` will have a section for scripts. These define useful snippets that you may want to run at the command line. To use a script, run `npm run scriptname` in your terminal.

A typical script section in the `package.json` of an Eleventy project might look like this:

```json
  "scripts": {
    "build": "npx @11ty/eleventy",
    "start": "npx @11ty/eleventy --serve",
    "debug": "DEBUG=* npx @11ty/eleventy"
  },
```
To run the script defined as "build", you would do `npm run build`, which would have the effect of calling `npx @11ty/eleventy`. 

`start` is a special name for scripts in node projects - you can drop the `run` and node will know that even though you just said `npm start`, you really meant `npm run start`. With most other build script names, the `run` is essential to include.

### A note on npx
`npx` is a command line tool brought to you via npm, which does a bit of magic: if the package you instruct it to use is defined locally, it will use the local version. If not, it will go ahead and download that package from the NPM registry, and then proceed to run it. There are some risks here - you want to make sure you're getting the package name exactly right, so you're not accidentally downloading and executing a different package than what you intend. See my post on [how `npx eleventy` differs from `npx @11ty/eleventy`](https://www.cassey.dev/til/2021-04-07-npx-risks/).

## .eleventy.js
`.eleventy.js` is where your Eleventy configuration goes. (Note the dot at the front of the file name - it's important.) 

The most basic structure of an `.eleventy.js` file looks like this: 
```javascript
module.exports = function(eleventyConfig) {
  // call functions on eleventyConfig here

  // return object options in the object starting on the line below
  return {};
  
  // down here is after the return - no code you put here will get executed
};
```

### Imports & Exports

If you have other functions or helpers you want to use in your config, you can define them above where your `module.exports` starts and use them in the body of the config function. 

If you want to put your helper functions in another file, or use any JS from your package dependencies, you can use `require` to import them. `require` statements should go at the very top of the file, outside of the `module.exports`. 

```javascript
// here I am importing a function I wrote, that lives in a file called getTagList.js
const getTagList = require("./config/getTagList");

// here I am importing a package I got from the npm registry, called markdown-it
const MarkdownIt = require("markdown-it");
```

Functions you write yourself that live in another file, and which you want to use elsewhere, need to be exported. The basic structure of `./config/getTagList` would look like this:

```javascript
module.exports = function(collection) {
 const something = collection.doStuff();
 return something;
}
```

If you're using JavaScript for data files, you'll also need that `module.exports =` bit in each of those files, and either set `module.exports = { /* some object */}` or return the thing you want to export at the end of the function you're exporting. JavaScript data files also support `require`s - you'll need them if you want to do something like fetch data from an external server in a global data file, and make that data available as global data to your template files.

## Conclusion
I hope this helped - and I'm curious what else you'd like to know! Drop me an [@ on twitter](https://twitter.com/CasseyLottman) or catch me in the official [Eleventy discord](https://www.11ty.dev/blog/discord/).  

### Further Reading
 - My post on [navigating existing Eleventy projects](https://www.cassey.dev/posts/2021-07-26-navigating-11ty-projects/) gives a nice summary of where the important bits of an Eleventy project are, which may be especially useful if you're familiar with how other static site generators work or if you're working with an existing project.
 - If you're converting a site that was *not* previously using a site generator, but rather was just statically served HTML, CSS, and maybe JS files, check out my post on [converting a simple HTML site to Eleventy](https://www.cassey.dev/posts/2021-10-23-converting-an-html-file-to-eleventy/). Why would you want to do that? Templating and re-use, basically. 
 - There are a ton of great [community-contributed tutorials on the Eleventy site](https://www.11ty.dev/docs/tutorials/), and some [quick tips](https://www.11ty.dev/docs/quicktips/) that might help, too.
 - I have some other helpful tidbits on [Eleventy in my TIL posts](https://www.cassey.dev/til/tags/eleventy/) you may find useful. 
