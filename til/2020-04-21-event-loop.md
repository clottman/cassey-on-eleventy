---
tags: ["post", "javascript"]
title: "Watching 'What the heck is the event loop, anyways?'"
description: "Now I know!"
date: 2020-04-21
---

I watched ["What the heck is the event loop, anyways?"](https://www.youtube.com/watch?v=8aGhZQkoFbQ) by Philip Roberts. I really appreciated the way the material was presented and it really helped the event loop concepts click for me.

Here are some notes I took while watching: 

Blocking basically just means "things that are slow"

Stuff goes on the call stack when it's called, and pops off the stack when it returns

The Javascript runtime can only do one thing at a time (is single-threaded), but pieces of the surrounding environment (WebAPIs in the browser or C++ APIs in the node server) can give JS the option to do more stuff. Like the ajax (XHR) web api, or setTimeout. 

When the Web APIs are done doing whatever (a network call, a timer), they push the callback onto the task queue. 

Event loop looks at the task queue & looks at the stack. If there's a task in the task queue & stack is clear, the task gets added to the stack and then the JS runtime will run it.

A question I had while watching was whether "ajax" just another word for XHR? Or something different? My coworker Johnicholas responded that "'Ajax' was a successful marketing rename" and that is a good enough answer for me.