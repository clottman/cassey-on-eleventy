---
tags: ["post", "accessibility", "minimum-font-size"]
title: "Why do some tweets not respect my minimum font size?"
description: "What language is 'lol'?"
date: 2020-10-08
---

Lately twitter has been displaying short tweet replies/quote tweets on mac/firefox in a way that doesn’t respect my minimum font sizes - they're too small! Turns out the culprit is that they’re setting a `lang='und'` attribute on the text element’s parent in some cases (like if the tweet is just the word 'lol', which Twitter's language detection algorithms apparently cannot parse), and there’s a very longstanding (18 years!) [bug in firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=181722) where the minimum font size you specify is only valid for the languages/encodings that it was specified for, rather than across all languages.

[Commenter 16 on the issue](https://bugzilla.mozilla.org/show_bug.cgi?id=181722#c16), 16 years ago, really nailed the issue here in my mind: 

> I think this entier thing is bogus... What I mean to say is: end-users don't
give a damn about the fact that different font sizes and encodings require
different minimum sizes. We humans don't work in font sizes in "points". We work
in "visual size".
> 
> I think we should find a way to allow the user to set the minimum visual size
(not in point units) that a font can have, regardless of the underlying encoding
and font and allow Thunderbird to map that back to point units.

This certainly seems correct to me, even though I happen to understand ‘points’ as a developer who also needs to use a larger minimum font size to browse the web comfortably. 

Another of my frustrations with Firefox's minimum font size settings is that you can’t set a minimum font size in Firefox without also overriding the font family - I want whatever font the website picked out, just, definitely as big as I need it to be and no smaller. This is what Google does for minimum font size, and I think it represents a better user experience. 


