---
layout: post
tags: ["posts", "rails", "code"]
title: "Ruby on Rails Model Association Reminders"
description: "a quick reference by and for me"
date: 2024-01-08
---

## belongs_to gets the database column
For a one-to-one or one-to-many relationship, the side with the `belongs_to` is the one where the database column (`other_model_id`) goes. 

Add the migration on an existing table like this:
```
def change
  add_reference :things, :other_thing
end
```
`add_reference` is aliased `add_belongs_to`. It will add an index by default. 

## has_one and has_many don't get a database column
Because it's on the belongs_to, get it?



