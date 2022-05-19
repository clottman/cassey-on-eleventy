---
til-tags: ["ruby", "rails"]
title: "Debugging strategies using binding.pry in Rails"
date: 2022-05-19
---

Something I had to get used to when switching to primarily Ruby on Rails development while working at Unabridged is debugging using `binding.pry` instead of a step-debugger tool. 

`pry` lets you stop the execution of running code, and inspect the values of all the in-scope variables at that point or run arbitrary code in that environment to figure out what's going wrong.

I was dealing with some tricky bugs the other day and asked my coworkers for strategies they use to more effectively work with `pry`. Here are some of what we all came up with: 

## Set the binding conditionally

This is helpful when you're processing a bunch of things and only one of them is causing trouble. 

```ruby
a_bunch_of_records.each do |record|
  do_some_stuff
  binding.pry if record.id == 1234
  more_stuff
end
```

## use `up` and `down`

These move the stack frame `up` or `down` respectively. This was exactly what I needed to solve my problem - the error was thrown in a method call based on what was getting passed in, but I needed to jump up the call stack to look at why that problematic data was getting passed in rather than what I should have had.

## `tap` a method

```ruby
do_some_stuff.tap do |result|
  binding.pry if result.is_bad?
end
```

`tap` passes the result of your method to a block, like so: 
```ruby
def tap
  yield(self)
  self
end
```
so instead of taking `some_operation_to_debug` and converting it to: 
```ruby
res = some_operation_to_debug
binding.pry
res
```
you can use `tap`!

## Ways to stop bindings from being hit 

### Set the binding unless you $skip_binding

Another variation on conditional binding, Nick likes to use 
```ruby
binding.pry unless $skip_binding
```

So that when he's done, he can do `$skip_binding = true` and let execution continue instead of stopping the whole server in order to make the binding stop getting hit. 

### disable-pry
Pry also has a built-in `disable-pry` command which just continues without hitting any more prys. 


