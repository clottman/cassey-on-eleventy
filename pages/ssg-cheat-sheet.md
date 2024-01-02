---
layout: layouts/post.njk
title: Static Site Generator Cheat Sheet & FAQ
templateEngineOverride: md
permalink: /ssg-faq/index.html
---
Questions I Frequently Ask Myself When Working With Static Sites (like my fave, [11ty](https://11ty.dev)):

## Why is there a pipe symbol in my YAML frontmatter?
`|-` or just `|` is yaml for "multilines"

## Why is there a dash in the liquid `{%-` tag?
> We can include hyphens in your tag syntax (`{{-`, `-}}`, `{%-`, `-%}`) to strip whitespace from left or right.

[docs source](https://liquidjs.com/tutorials/whitespace-control.html)

Nunjucks does it, too.

## How do I comment stuff in Nunjucks? 
`{# like this #}`

