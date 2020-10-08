---
tags: ['post', 'talks', 'refactoring']
title: 'Therapeutic Refactoring by Katrina Owen'
description: "Notes from watching a conference talk" 
date: 2019-07-30
---

I'm watching [Therapeutic Refactoring by Katrina Owen](https://www.youtube.com/watch?v=KA9i5IGS-oU).

The talk starts by giving an example of a monster of a method that one came across. A very large method, doing things at two different levels of abstraction, "and nothing at the lower level of abstraction is being named."

> "The thing to do with big ugly code is to break it down into small ugly code."

## Step 1: Testing 

How do you begin testing something when you don't know what the inputs look like, you don't know what the outputs look like, and it isn't broken (no customers are complaining)? 

Characterization tests are Katrina's proposed solution. 

First send some empty stub to your method as an argument, and see what breaks. That starts to tell you what attributes your stub needs to have. 

Then you need to make sure that all conditionals have a test case that covers them. 

You use fake assertions that will break and tell you what, given your inputs, the output actually is. 

Note that at this point you've written a lot of tests that describe what the code currently does, when every single branch of every conditional is used. 

## Step 2: Refactoring
### Replace *method* with *method object*
 - A tip from Martin Fowler's Refactoring book. 
 
## Other stuff 

Katrina notes that if you optimize for developer happiness by making your tests really fast, you'll get more tests and better code! 

## Discussion Notes 

Katrina goes through some things that she thinks make code 'bad code'. The consensus in the group of coworkers I watched the video with is that these are more opinion than fact, and that a lot of the concerns she raises can be solved by using a good linter. 


Some topics in the discussion following the video: 
 - what parts of the video we learned the most from
 - when do folks read books on technical topics? Can we do that during work hours?
 - how much refactoring do we do? Should we be doing more? How do we decide when you're working on a feature or a bug, that certain code needs to be refactored _right now_? 