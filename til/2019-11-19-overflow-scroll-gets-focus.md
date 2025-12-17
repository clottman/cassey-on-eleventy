---
tilTags: ['css', 'accessibility']
title: 'Elements with overflow: scroll become focusable'
date: 2019-11-19
---

**Updated 2025-12-17**: Since Glitch as 'the friendly community to build on the web' is shut down now, I removed the direct links to Glitch.com that no longer work or won't work soon enough.
<br/>
I was working on re-building a custom select list component to make it more keyboard-friendly when I encountered a strange bug: the `<section>` element wrapping the result elements was in the focus order, even though it didn't have `tabIndex` set on it. Since my custom component handles focus traversal on the result items on its own, this extra tab stop was a bug.

After some digging, I discovered that the culprit was a CSS class setting `overflow: scroll` on the `section`. With `overflow: scroll` set on an element, both Firefox and Chrome<sup>1</sup> put the element in tab order, as an accessibility feature. With the element in tab order, users can use the arrow keys to scroll through the scrollable area. 

## Why do browsers do that?
If the scroll-containing element wasn't in tab order, there would be no way for a [keyboard-only user](https://webaccess.berkeley.edu/ask-pecan/keyboard-only) to scroll and see all the content. 

Interested in digging more? [Read the initial bug report and fix documentation at the Chromium bug tracker](https://bugs.chromium.org/p/chromium/issues/detail?id=585413). 


## What if I don't want this behavior?

In my case, since I was implementing focus traversal through the scrollable list myself, it didn't make sense for the container element to receive keyboard focus. So, I set `tabindex='-1'` on the container `section`, which the browsers I tested respected (that is, the `section` element was no longer in keyboard tab order).

If you're _not_ providing an alternate means for keyboard-only users to scroll through a scrollable element, leave this behavior alone. It's making your site more accessible, without you having to do anything special - how neat is that??

## Test it yourself

(2025 note: this section previously contained an embed of the app running on Glitch, which has since been shut down.)

<br> 
<br>
1. And possibly other browsers; those are the only two I tested. Safari seems not to do this.
