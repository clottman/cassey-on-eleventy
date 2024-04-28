---
layout: post
title: Why are most Web Accessibility Checkers Browser Extensions or Bookmarklets?
tags: ['posts', 'accessibility']
description: ''
date: 2024-04-28T10:19:00-05:00
---

An answer to a question someone asked recently in a walled-garden, unwalled for the open web. 

Accessibility testing tools tend to be browser extensions or bookmarklets because the accessibility of a webpage is context dependent. Accessibility is not an inherent feature of the website's code; accessibility is dependent on interactions between the website and the browser it's being viewed in, as well as the accessibility tools used with the browser. Accessibility tools (sometimes called assistive technology) people might be using include things like screenreaders, a switch control instead of a mouse, voice control interfaces, zoom tools, etc.

Something like getting all the image alt texts for images on the page seems like it'd be really straightforward to determine, but different browsers might follow different algorithms for how they calculate the accessible name for other kinds of elements. (Beyond alt text on an   `img`; what about for an SVG? Or for a button? Or a div being used incorrectly as a button?) Then adding in the assistive technology like Voiceover or NVDA - either one might then use the accessible name (or some other feature that supports accessibility) in a different way, resulting in a different user experience.

If a tool for testing web accessibility is built into the browser (like an extension or bookmarklet), the tool developer can use the accessibility information that's exposed directly by the browser, which is what the screenreader or other assistive technology tool might use to decide what to present to the user. This is calculated stuff that is not a 1-1 correlation with the HTML of the page- a different browser, or even a different version of the same browser, might give a different result! A standalone tool wouldn't have access to that extra information, without essentially building the whole browser into the tool. This would be a much bigger maintenance burden for the tool makers, but also, probably not allowed by browser licensing at all anyways.