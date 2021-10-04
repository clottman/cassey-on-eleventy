---
til-tags: ["ruby", "rails"]
title: "What's this tilde arrow thing in my Gemfile?"
description: "A lesson in pessimistic versioning"
date: 2021-10-04
---

Today I learned two new concept-phrases: "pessimistic versioning" and "twiddle-wakka" (yes really). I learned them via a PR review comment that sent me to [the RubyGems patterns documentation](https://guides.rubygems.org/patterns/).

Pessimistic versioning is something you might want if you're using a shared library (or gem, in Ruby world) that's following semantic versioning, and you're okay with all minor version bumps, but not any major version bumps until you specify so explicitly. 

Pessimistic versioning is contrasted with "optimistic" version constraints, like `gem 'library', '>= 2.2.0'` - give me anything above 2.2.0, even if a major version is released with breaking changes in it. 

In Ruby Gems you can define that you only want versions above a certain version and below a certain other version, like `gem 'library', '>= 2.2.0', '< 3.0'`. 
But RubyGems has a shorthand for this, which is called the twiddle-wakka, and uses `~>`, or a tilde and an arrow next to each other. 

```
gem 'library', '~> 2.2'
# is equivalent to 
gem 'library', '>= 2.2.0', '< 3.0'
```
