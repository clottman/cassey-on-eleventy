---
layout: post
title: Dev Snippets & Keyboard Shortcuts 
tags: ['posts', 'tech-resources', 'code', 'resources']
description: ''
templateEngineOverride: md
date: 2024-04-26T10:54:00-05:00
permalink: /snippets/index.html
---

See also: [my cheat sheet/personal FAQ when working with static site generators](/ssg-faq), and [all my other tech resources posts](/blog/tags/tech-resources/).

Here are some shortcuts or short snippets I often find myself searching for. Expect this page to be updated over time as I think of more useful snippets or shortcuts!

## A regex to find all trailing whitespace & tabs in a file
`[ \t]+$`

## Open the character viewer on Mac to type an emoji
Control + Command + Space, **or** fn + E

fn+E works if you type a word first and want to match the emoji to that. Then hit return/enter to make it go. 

## Minitest Assertion Order
To save myself opening the [Mintest Style Guide](https://minitest.rubystyle.guide/#assert-equal-arguments-order) and squinting at the answer there: 

In Minitest, we **`assert_equal expected, actual`**

## Mysql + Rails stuff
`mysql -h 127.0.0.1 -u root -p db_name`
This lets me connect to a dev db locally, without going through Rails.

`bin/rails db -p`
This gives me a sql console that is in Rails.

`mysql -h 127.0.0.1 -u root -p db_name < query.sql > next_query.sql`
This runs the stuff in query.sql and pipes the output to next_query.sql.

`ActiveRecord::Base.connection.execute(sql_string)`
Run some SQL in a Rails console without going into a special console.

