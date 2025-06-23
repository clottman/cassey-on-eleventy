---
layout: post
title: Minitest assert_equals order style
tilTags: ["ruby", "rails"]
description: 'assert_equals(expected, actual)'
date: 2025-06-23T17:06:00-05:00
---

I find myself pulling up this page from a [Minitest Ruby Style Guide on the argument order for assert_equal](https://minitest.rubystyle.guide/#assert-equal-arguments-order) all the time, but I always have to squint at it longer than I'd like to see what I need to see.

And yes, I'm aware that I could put a sticky note with this information on my desk.

Anyways. Do it like this:

```ruby
assert_equal(expected, actual)
```
