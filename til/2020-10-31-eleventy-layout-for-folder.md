---
tilTags: ["eleventy"]
title: "Setting a layout for every page generated from a particular folder in Eleventy"
description: "What's in your directory data file?"
date: 2020-10-31
---

As I was working on making my Today I Learned posts first-party members of this very site (they used to live in a separate site on Glitch), I moved over all the posts and placed them in a new folder called `til/`. But, each post was getting rendered as plain text, with no header or footer! The blog posts that have always been on this site have a `layout:` key in the frontmatter, but the TIL posts from the other site did not, and there was a lot of them. Too many to edit each one! 

As an added complication, I wanted to use a different layout for the posts in `til/` than the posts in `blog/`, the folder housing the non-til-blog posts. 

In 11ty there are a lot of ways of defining data for your templates, including configuration data like layouts. The thing I needed for this was a [Directory Data File](https://www.11ty.dev/docs/data-template-dir/).

Inside `til/`, I added a file called `til.json`. (Relative path: `posts/til/til.json`, matching `posts/subdir/subdir.json` as shown in the docs). It's contents are pretty bare bones right now: 

``` json
{
    "layout": "layouts/til-post.njk"
}
```

After adding this file with these contents, every page generated from the files in the `til` folder used the `til-post` layout. (My layouts are in `_includes`, by Eleventy default, so that layout would be at `_includes/layouts/til-post.njk`.)

