---
layout: layouts/post.njk
title: Static Site Generator Cheat Sheet & FAQ
templateEngineOverride: md
tags: ['code', 'tech-resources']
permalink: /ssg-faq/index.html
---
See also [all my other tech resources posts](/blog/tags/tech-resources/)!

# Questions I Frequently Ask Myself When Working With Static Sites 
<p class="text-big">(like my fave, <a href="https://11ty.dev">11ty</a>):</p>

## Why is there a pipe symbol in my YAML frontmatter?
`|-` or just `|` is yaml for "multilines"

## Why is there a dash in the liquid `{%-` tag?
> We can include hyphens in your tag syntax (`{{-`, `-}}`, `{%-`, `-%}`) to strip whitespace from left or right.

[docs source](https://liquidjs.com/tutorials/whitespace-control.html)

Nunjucks does it, too.

## How do I comment stuff in Nunjucks? 
`{# like this #}`

