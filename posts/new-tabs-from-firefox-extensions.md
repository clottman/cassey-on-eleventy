---
layout: post
title: Opening a new window from a Firefox Add-On
date: 2020-03-15
tags: [posts, firefox, javascript]
social_description: "It's easy, but keep in mind this One Weird Trick!"
redirectsFrom: "/posts/2020-03-15-new-tabs-from-firefox-extensions/"
---

Last year, I made [my first couple browser extensions](/glitch-app-to-project-ext/)! Both were built to solve immediate needs I have: one to [go between the various representations of a Glitch project](https://glitch.com/~app-to-project-extension) (the project page at glitch.com/~projectname, the editor, and the running code at projectname.glitch.me), and one to add things to my [Pinboard](https://pinboard.in) bookmarks.

The code that opens the Add to Pinboard page originated as [code for a bookmarklet, provided by Pinboard](https://pinboard.in/howto/#saving), but I like extensions better. Bookmarklets show up in my browser's Bookmarks toolbar, which I usually keep hidden. Extensions show up right next to the address bar, in a single line.

I use my Pinboard extension pretty regularly<sup>1</sup>, in both [Chrome](https://chrome.google.com/webstore/detail/pinboard-it/mafapkanfcjklkaloepbphjpmfefobbj) and [Firefox as an Add-On](https://addons.mozilla.org/en-US/firefox/addon/add-to-pinboard/). But my Firefox version was annoying: when I clicked the extension, I'd see a little warning that a popup had been blocked, and would I like to allow it to be opened anyways? Yes, I would, every time. But the only options available in the little menu were to always allow popups on whatever site I was trying to save, or allow it just this once. That wasn't great- I might want to allow my Pinboard add-on to open a popup so I can save a link to a cute dress in an online shopping website, but I wouldn't want that shopping site to start sending me its own popups.

## How can I allow my extension to always open a popup window in Firefox?

The answer turned out to be something I needed to change in code.

Previously, my extension used the exact same code as the bookmarklet, which called `open('https://example.com')` to open the new tab.

If I changed my tab-opening code to use the APIs that exist especially for browser extensions, the popup would not be blocked.

`chrome.tabs.create({ url: 'https://example.com' });`

You can see [the full source code for my extension on Glitch](https://glitch.com/edit/#!/pinboard-extension?path=extension/background.js:1:0).

Thanks to these friends in [a Mozilla forum question in 2018](https://discourse.mozilla.org/t/avoid-popup-blocker/31549) for pointing me in the right direction!

## Addendum

1. Judging by the active user stats, I am probably the only person using my extension, albeit from two different computers. I agree with Robin Sloan that [an app can be a home-cooked meal](https://www.robinsloan.com/notes/home-cooked-app/).
