---
tilTags: ["eleventy"]
title: "Using Nunjucks shortcodes in Markdown files in Eleventy"
description: "Unlock the power of Eleventy Image in your md posts"
date: 2021-07-29
---

Today I started taking a look at [Eleventy Image](https://www.11ty.dev/docs/plugins/image/), a powerful plugin for [Eleventy](https://www.11ty.dev) that generates images in optimal sizes and formats for the web. 

There is [example code](https://www.11ty.dev/docs/plugins/image/#use-this-in-your-templates) for generating `img` and `picture` elements for all your images using shortcodes in Nunjucks, Liquid, and Javascript. 

But if you're like me, you probably sometimes want to include photos in your blog posts, and you may be writing your blog posts in Markdown, not Nunjucks or Liquid. (Anyone out there writing blog posts in straight javascript? I wanna hear about it.) How can you quickly use the images generated by Eleventy Image in `my-cool-post.md`?

> Is Eleventy Image just missing a key feature?
> **Of course it's not.**

The answer lies in one of Eleventy's special configuration options, [`markdownTemplateEngine`](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files).

Turns out, Markdown files (and markdown files only, though there is also an option for HTML files) are run through another template engine first, before being parsed as Markdown and converted to HTML. By default, this feature uses Liquid as the template engine, but you can easily change it on a [per-file, per-folder](https://www.11ty.dev/docs/languages/#templateengineoverride-examples), or global basis to use Nunjucks instead. 

```js
// in .eleventy.js
module.exports = function(eleventyConfig) {
  return {
    markdownTemplateEngine: "njk"
  }
};
```

In your post's frontmatter, [template data file, or directory data file](https://www.11ty.dev/docs/data-template-dir/):
```yml
---
templateEngineOverride: njk,md
---
```
