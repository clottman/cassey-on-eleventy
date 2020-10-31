---
til-tags: ['post', 'accessibility', 'html']
title: 'Does <details> work with Assistive Technology?'
description: "a11ysupport.io found out!" 
date: 2019-08-06
---

A coworker & I were talking about the `<details>` element and I had a hard time finding up to date info on how well supported it is by assistive technology. I asked around and my friend Michael Fairchild ended up [running a test for it](https://a11ysupport.io/tests/tech__html__details-summary) to add to [his website, a11ysupport.io](a11ysupport.io).
  
I learned: Dragon Naturally Speaking doesn’t support opening a details element by voice, Narrator (built-in in Windows screenreader) support is very limited and other screenreaders have a few shortcomings in various places. No screenreader can make the element work in Internet Explorer, since the `<details>` element isn't supported by that browser at all. 
  
[See the full test results here](https://a11ysupport.io/tests/tech__html__details-summary) 
  
More [details on the details element](https://speakerdeck.com/muan/details-on).