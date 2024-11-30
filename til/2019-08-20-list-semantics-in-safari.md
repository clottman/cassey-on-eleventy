---
tilTags: ['accessibility']
title: 'Voiceover with Safari & List Semantics'
description: "They might not work. Here's why." 
date: 2019-08-20
---

I learned that when `list-style: none` is used, Safari does not expose the semantics of a list to assistive technology, meaning Voiceover won't announce your list as a list. The developers of Safari see this as a feature not a bug, because they believe too many developers are using the `<li>` elements for non-semantic reasons. 

This is one of few cases where changes you make in CSS affect the semantics of your HTML, and it's an open question whether that's desirable or not. 

As [Scott O'Hara points out](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html), it makes it harder to teach developers about the correct use of ARIA and semantic HTML when sometimes semantic HTML won't be communicated semantically, so you need to double-up by using an ARIA role on an element that already has semantic meaning. 

Scott writes: 
> It’s a constant struggle to educate developers who are new to accessibility for the reasons why “you don’t need to use ARIA if you use the correct HTML elements.” Only to then have to explain with your next breath:
>
> “You need to use ARIA to add list semantics for this one specific browser and screen reader combination.
>
> No you don’t need to do this for other browsers and screen reader combos.
> 
> No, this doesn’t happen with Chrome (Blink) and VoiceOver.
> 
> No, you’ll just have to ignore the warnings your automated checkers give you that say ‘don’t double up ARIA roles on their native element equivalents’.
> 
> No, this isn’t for Internet Explorer…”