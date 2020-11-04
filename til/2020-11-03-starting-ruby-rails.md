---
til-tags: ["rails", "ruby"]
title: "Starting to pick up Ruby & Rails"
description: ""
date: 2020-11-03
---

I started a new job this week, at a consulting agency that works in Ruby on Rails a lot. I used Rails at a summer internship in college, but haven't really touched it since. Here's a few things I learned or read on my first day studying up. 

- Rails itself isn't a server that accepts traffic; it does handle routing and such though. In the company's apps, Puma is the actual server that accepts traffic and forwards it on to the running Rails instance to handle and come up with a response. There are alternatives to Puma, but Puma is very popular and comes with Rails by default. 

- Strings defined with single quotes: no interpolation. Strings with double quotes: `"yes <#interpolatedVars>"`

## A selection of things I read 

- [Ruby gotchas for a Javascript developer](https://calendly.com/blog/ruby-gotchas-javascript-developer/)
- [Ruby quickref](https://www.zenspider.com/ruby/quickref.html) (bookmarking this one!)
- [Ruby coding conventions](https://github.com/gauthamchandra/learning-ruby-from-js/blob/master/coding_conventions.md)
- [Ruby and OOP](https://github.com/gauthamchandra/learning-ruby-from-js/blob/master/ruby_oop_design.md)
- [attr_accessor and friends, for generating getters & setters](https://www.rubyguides.com/2018/11/attr_accessor/)
