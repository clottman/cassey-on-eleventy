---
tilTags: ['talks', 'careers']
title: '"From Puzzles to Products" by Jessica Kerr'
description: A Conference Video from Velocity Conf 2019
date: 2019-07-16
---

I'm watching ["From Puzzles to Products" by Jessica Kerr](https://blog.atomist.com/from-puzzles-to-products/), a talk from Velocity Conf 2019, along with some coworkers. Here are my notes.

At the beginning of Jessica's career, programming was easy. It was about solving puzzles and then going home at 5:30 to relax with friends. Then, software became harder when she started having to define requirements and work with customers to actually build the right solution. 

Then there was a map of how a product has lots of components (the stack it's built on) showing which things are the most reliable and the most visible. This is called a Wardley map.

> "In Why Information Grows, César Hidalgo defines a product as embodied information. A product enfolds practical knowledge about the world, in a way that we can use that knowledge without having it."

The idea of 'embodied information' reminds me of the concept of affordances - aspects of a thing's design that tell you, through the design, how to use it. An affordance on a teapot is a handle that looks like maybe you could put your fingers inside to pick up the teapot, and a spout that's curved with a whole at the end telling you 'pour it through this end'. 
 - Coworker Rachel points out that this comes up a lot in game design - in the first few levels in modern games, you are invited to try something rather than told what to do. Casual games are often better at this than more 'serious' games. I am reminded of my time trying out Hollow Knight - I was definitely invited to do _something_ but I couldn't figure out what or why I would do it. It was so frustrating! I was missing the cultural knowledge of how games of that kind usually work and so I the affordances that I was (probably) being given didn't really work on me.

> "Other people’s products represent capabilities we can get with very little knowledge, and some money. Money is a lot easier to move around than knowledge. This frees us to focus on what other companies don’t do."

> "The point of having custom software is that you control the pace of change."

The software team can control a lot of things about the code - code quality, number of tests, what stack it's built on. It's easy for us to change those things and we can turn them into puzzles. We have less control over feature requests and needs coming in to us from the people who use our software. 

Jessica says designing change should be our goal, not designing code. All the code we might see as 'messy' - lots of if statements, toggles, etc represent a history and they're not ugly when you think about how they helped you control change in your software and for your users.

I found this talk a little hard to follow, in part because the text presented alongside the video was a blog post/essay version of the talk, not a transcript. So when I lost my place, I couldn't refind it by looking for the words that had just been spoken in the video. 

Sarah (a coworker) mentions that Jessica refers to UI as being a custom layer, but in practice, UI layers are full of libraries and shared code to reduce complexity. Implementing custom drag & drop is a great example - don't do it! There's a library out there where someone else is managing that complexity. 

Mads (another coworker) asks: is this mindset appropriate for everyone, or should some people be focused only on puzzles? 

We talk a bit about what a puzzle is and if code is really puzzles. I hate puzzles! Brain teasers and trick question kind of games don't really interest me. Mads remembers that Jessica defined puzzles as having a well defined end state, a 'complete'. A lot of code I write, even when it's checked in and deployed, doesn't really feel 'done'. There are always more features to implement, a bit that can be refactored, more tests you can add. 