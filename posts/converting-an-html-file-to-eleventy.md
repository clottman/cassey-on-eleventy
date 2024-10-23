---
layout: post
tags: ["posts", "eleventy", "code"]
title: "Converting a simple HTML site to use Eleventy"
description: "For when you're ready for a little templating fun"
date: 2021-10-23
redirectsFrom: "/posts/2021-10-23-converting-an-html-file-to-eleventy/"
---

So, you have a site that currently consists of one or more HTML files, and maybe some images. Your site is growing, and you're starting to think that using a template engine might be nice so you can write your pages in Markdown, or share your meta tags and layout between multiple pages. You know about Eleventy, and have maybe dabbled in using it for a blog before using a starter project. But how the heck do you start using Eleventy on a simple HTML site that already exists, without adding a lot of extra stuff you don't need?

## Setting Up Eleventy
For this post, I'm assuming you already have node and npm installed on your machine. 

1. Add a package.json
    - Run `npm init` in your site's working directory to [create a package.json file](https://docs.npmjs.com/creating-a-package-json-file), where metadata about your project and a list of dependencies will be stored. Go through the interactive prompts and set the metadata as accurately as you want; you can always change them later.
     remove the `main` key from the package.json that was just created. 

2. Install Eleventy into package.json
    - Run `npm install --save-dev @11ty/eleventy` 
    - Add these entries to your package.json `scripts`: 

```json
"scripts": {
    "build": "npx @11ty/eleventy",
    "start": "npx @11ty/eleventy --serve",
    "debug": "DEBUG=* npx @11ty/eleventy"
}
```

3. Add a .gitignore
    - Your site has node_modules/ now where it didn't before, so you may need to add a `.gitignore` file if you haven't already. Here's what I keep in the `.gitignore` for this site: 
```text
_site/
node_modules/
.DS_Store
```

4. If your site has a readme, make Eleventy ignore it.
    - Add a file in the root of your project directory called `.eleventyignore` and add the name of your readme there. (perhaps `README.md`)

5. Run `npm start` and hope for the best
You should see a few files being written to the `_site` directory - hopefully the files that make up your site and nothing else.
    - Common issues: 
        - Your readme is being transformed by Eleventy and written to `_site` - maybe it even throws an error.
        Solution: make sure you completed step 4.
        - Eleventy is trying to process things in node_modules, and throwing errors. 
        Solution: make sure you added a .gitignore, and included `node_modules/` in it. If you don't want to gitignore your modules, add `node_modules/` to your `.eleventyignore` file.
        - Start script is missing - see step 2 for how this script should be defined in your package.json. If you run `npx @11ty/eleventy --serve` directly, it may appear to work now, but the `.eleventyignore` and `.eleventy.js` files we're going to add won't get read. 
        - Your CSS or images are missing when you load the site in a browser. 
        Solution: We'll tackle that next.

6. Make sure your assets are getting written to `_site`.
    - By default, html files will get written to the build output directory (`_site`), but your CSS files and images won't be. To address that, we'll need to add an Eleventy config file and configure it to write your assets to the build directory. 
    - Add a file named `.eleventy.js` (the leading `.` is important!) 

The most basic structure of an `.eleventy.js` file looks like this: 
```javascript
module.exports = function(eleventyConfig) {
  // call functions on eleventyConfig here

  // return object options in the object starting on the line below
  return {};
};
```

Set a passthrough file copy for your images, CSS, and any other files you need to be in the final site but don't need Eleventy to process, like PDFs, by adding these lines, replacing the arguments to each `addPassthroughCopy` call with the names of the directories where those assets are stored in your project, or a file-selecting glob. (See [the docs on passthrough file copy](https://www.11ty.dev/docs/copy/) for more details on this.)

```javascript
module.exports = function(eleventyConfig) {
  // call functions on eleventyConfig here

  // let's just pass through whatever is in the css/ or images/ folder for now
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  // return object options in the object starting on the line below
  return {};
};
```

## Deployment
The instructions here assume you're using Netlify for hosting - the steps you need to take my differ if you're using a different hosting provider. 

Since my site is already live, I want to convert it to serve from `_site` without any downtime. When it was just html files, my only build command was to `rm README.md` and then serve everything that was left in my repo. With Eleventy, I want Netlify to build the site, then serve only what's in `_site`. 

To make this happen without any downtime, I'm going to add a `netlify.toml` file with deploy instructions so that nothing changes until this branch with all the Eleventy stuff goes into the main branch of my site. There is probably a way to do this through the Netlify UI, maybe involving stopping builds for a time, changing settings, and then re-activating, but this feels easy enough for now and means that the Netlify deploy previews on PRs that I have turned on will work for this Eleventy conversion work.

Add a file called `netlify.toml` and put this in it: 

```
[build]
  publish = "_site/"

  command = "eleventy"
```

## Next Steps
At this point, you should have a working Eleventy site - if you're missing files, take another look at your passthrough copy configurations. You can start using any of the [template formats](https://www.11ty.dev/docs/languages/) supported by Eleventy by default for new pages, or convert existing pages to use them. 

For your files with an `.html` extension, you can start adding `liquid` syntax right away. Or, you can change the [`htmlTemplateEngine`](https://www.11ty.dev/docs/config/#default-template-engine-for-html-files) to your template engine of choice (I like nunjucks) and use that in your `html` files. You can make this change gradually and incrementally, adding just the templating that you need without converting your whole page to use that language. 

### Adding layouts
By default, Eleventy will look for layouts in the `_includes` directory. If you want to create a layout for multiple pages to use, create a layout at `_includes/base.njk` (replacing `base` with whatever you'd like your layout to be), and copy over any layout-related HTML boilerplate from your original HTML page to that file. (by 'layout', here I'm referring to things like the HTML doctype declaration and the root `html`, `head`, and `body` tags and anything that's shared across pages in `head`, not the layout of the content of an individual page.)

Your layout file might look something like this snippet taken from [the Eleventy docs on layouts](https://www.11ty.dev/docs/layouts/).

```html
---
title: My Rad Blog
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

Then, in the pages where you want to use this layout, add some frontmatter at the top of the file, like this: 

```
---
title: Words to Override the Default Title from Layout
layout: base.njk
---
```

### Organizing Files
At this point your directory structure might feel a little messy - you've got config files nestled up against website files and the `_site` and `node_modules` directories. Perhaps you want all your website files in the same folder. 
1. Create a new folder; I called mine `src`
2. Move the website-related files into it: 
   - the whole `_includes` directory,
   - your html and css files,
   - and any other files that are being passed through to the build directory
3. In your `.eleventy.js` file, modify the return value's setting for `dir.input` (note the `dir`!) so that Eleventy knows to look in `src/` for all your files.

At this point, my Eleventy config looks like this:

```javascript
module.exports = function (eleventyConfig) {
  // call functions on eleventyConfig here

  eleventyConfig.addPassthroughCopy("css/*.css");
  eleventyConfig.addPassthroughCopy("images");

  // return object options in the object starting on the line below
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
    },
  };
};
```

## Conclusion
By now you should have a working Eleventy site with some basic file organization and all your existing code working the way it did before. Time to get back to writing content! (I know, you were probably doing this conversion to avoid that part.) Happy hacking!
