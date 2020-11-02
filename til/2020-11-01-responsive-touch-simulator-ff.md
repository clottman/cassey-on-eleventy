---
til-tags: ["firefox", "devtools"]
title: "Firefox Responsive Design Mode and Hover Events"
description: "Where's my hover styles??"
date: 2020-11-01
---

I need to preface this with: until recently, even though I used Firefox for browsing, I typically used Chrome and Chrome's Developer Tools for web development. 

Today I redesigned cassey.dev, and used Firefox primarily. Things were going great until I checked out how the design looked in the responsive design mode. 

Like in Chrome, there's an option in Firefox's dev tools to emulate a smaller screen size, so you can more easily test out what your site will look like on a phone or tablet from a workstation. This option is called [Responsive Design Mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode).

I was working on a toggle button that opens and shows the navigation menu, but shows at all at smaller screen sizes. I made it change colors on hover and focus - but no matter how much I hovered on my button, it didn't change colors. I checked and double-checked my syntax. I looked at the [MDN docs for `:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover). I checked the browser compatibility just in case - but no, `:hover` has been supported in Firefox for all elements since Firefox v1. I searched for reported bugs or gotchas in how `:hover` works and found none. And still, my hover styles did not appear. If I changed the pseudo-class in the dev tools to `:hover`, my styles would show up. But not if I actually moved the mouse over the element.

Finally I started clicking around in Firefox, to see if there was some option that was turning off hover events. And yes, there was! The button is called [touch simulation](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode#Toggling_touch_event_simulation) and the icon for it - a small hand with pointer finger extended, with lines radiating out from the tip of the finger - was blue, enabled. After toggling to `disable touch simulation`, I saw my beautiful hover effect.



