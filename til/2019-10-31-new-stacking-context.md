---
tags: ['post', 'css']
title: 'CSS properties that create an implicit stacking context'
date: 2019-10-31
---

I had a bug where a background image was being set on a container with `position: absolute`. One of the children wasn't visible on the page, but it appeared when you set `position: relative`.  Okay, that makes sense. But, there were some other elements that didn't have `position` set, and they were still appearing on top of the absolutely positioned background. Why?

The reason turned out to be those elements were using the `transform` or `opacity` properties. I learned that these properties, and a few others, create implicit z-index stacking contexts which cause them to appear on top of the absolutely positioned backgroudn. 