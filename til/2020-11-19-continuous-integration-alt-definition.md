---
tilTags: ["devops"]
title: "Continuous Integration: another definition"
description: "What if every developer merged into the main branch multiple times per day?"
date: 2020-11-19
---

I'm reading "Refactoring: Improving the Design of Existing Code" and it mentions a definition of continuous integration I'm not familiar with. In extreme programming, [continuous integration](https://martinfowler.com/articles/continuousIntegration.html) refers to not having long-lived feature branches. Instead, all the developers working on a thing merge with the primary branch super regularly, every day if not multiple times a day. This makes refactoring easier because if you make semantic changes (like renaming a function that's used in several places), other people get your changes quickly, and merges are less difficult.

Here's how Martin Fowler defines it in the article linked above: 

>  Continuous Integration is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly. This article is a quick overview of Continuous Integration summarizing the technique and its current usage. 

I'm not sure how this model coexists with code review, which in my experience, has been a pretty important factor in code quality and team velocity.

In the usage of continuous integration I'm familiar with, merges happen frequently through pull requests into a main branch. The pull request can only be accepted after the result of the merge has been successfully built by a continuous integration server and all tests have passed. But, development still often happens on feature branches which aren't merged until the whole feature is complete. An exception might be for particularly large features, which are merged in smaller chunks and the feature is hidden behind a feature flag until the whole thing is ready. 
