---
tilTags: ["ruby"]
title: "The Ruby splat operator can destructure arrays"
description: "An exploration into what a strange star was doing"
date: 2021-04-05
---

Today I learned about the splat operator in ruby, aka the `*` or asterisk operator.

I came across some code like this in [the readme for Motion](https://github.com/unabridged/motion): 
```ruby
def handle_created(name)
    @todos = [name, *@todos.first(@count - 1)]
end
```

And I couldn't figure out what that middle line did. I can see it's assigning an array to a variable. The first element of the array will be the `name` parameter that's provided to the method. But what is going on with `*@todos.first(@count - 1)`? 

I was most confused about the `*`, but I also wasn't sure why `first` was taking an argument. At first I guessed it was finding the first element that matched the condition `@count - 1`, but that didn't make much sense. Actually, `first` takes an argument that tells it to return the first `x` elements of the array it's called on. 

Okay, so this * thing is operating on an array. I learned from my helpful coworkers that one thing the splat operator can do is destructure the array it's called on, so something like: 

```ruby
[1, *[2, 3]] 
=> 
[1, 2, 3]
```  

So, that method in the middle is taking a new `name`, and making a new array where that `name` is the first element and all the `todos` that were already in the array follow that element. The result is one single array with a list of names in it. 

Next I read [this article on the splat operator](https://www.honeybadger.io/blog/ruby-splat-array-manipulation-destructuring/) and learned a bunch more cool things this operator can do.

Handy! 
