---
layout: post
title: "Glitch App to Glitch Project Extension"
date: 2019-05-30
tags: [code, posts, glitch]
redirectsFrom: "/posts/2019-05-30-glitch-app-to-project-ext/"
---

# What I Made

[Glitch Project: Glitch App to Glitch Project Extension for Chrome](https://glitch.com/~app-to-project-extension).

[Install it from the Chrome App Store](https://chrome.google.com/webstore/detail/glitch-app-to-project/ilfiblbgfdmfpbmofapdekpefnaghjhm)!

It is: a Chrome Extension.

When you click it:

- if you're not on a page where the domain ends in `glitch.me`, nothing happens.
- if you're on a page where the domain ends in `glitch.me`, it redirects your browser tab to the page on Glitch.com representing that app.
  - So if you're on soulpatch.glitch.me and you click the button, you get redirected to glitch.com/~soulpatch!

This is handy for: apps built on Glitch that don't have a button linking to the project, so you can quickly go add the cool app to one of your collections, or see what else that creator has made on Glitch.

My friend [Potch](https://glitch.com/@potch) made https://glitch.com/~broad-flare/, which is a port of my project to make it work as an extension in Firefox.

# Background

This was my second ever Chrome extension, and both were built the same week. The first one was a [Pinboard Extension for Chrome](https://glitch.com/~pinboard-extension) which runs on any site. When it's clicked, it runs some Javascript that opens a new tab so you can add the site you were on to a personal link-catalogging service called Pinboard. ~pinboard-extension makes a good base project for making new Chrome extensions.

The App-to-Project extension is a bit more complicated than my Pinboard extension, because it only runs on `something.glitch.me` pages.

# What's Next

I learned through these projects that it's really easy to make Chrome extensions, once you have a good base project to remix from, to do any little task I want to do from a webpage. I want to make more extensions now! They're more useful to me than bookmarklets, because they live right in the same line as the address bar and so don't take up the space that the Chrome Bookmarks bar does.

I also want to learn what the differences are between Chrome and Firefox extension definitions, so I can port my extensions to the both browsers on my own.

[Discuss this in the Glitch Forums](https://support.glitch.com/t/glitch-app-to-glitch-project-page-extensions/11095)
