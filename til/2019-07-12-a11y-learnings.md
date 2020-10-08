---
tags: ['post', 'design', 'accessibility', 'testing']
title: Readings on Accessibility
description: Articles I learned from today
date: 2019-07-12
---
I've read a lot about web accessibility today. Here are some of the things I've learned. 

## Screenreader-aware design tools
A colleague shared [Screenreader-aware Design Tools](https://www.sourcenoteapp.com/blog/screenreader-aware-design-tools) which was interesting. It was mostly focused on mobile app design, which is something I haven't worked with much. At least on the web, the screenreader UX is determined entirely by what HTML actually gets rendered. I see big opportunities for designs to include guidance on what type of HTML element should be used for a particular piece of the UI (a button or a link?) and indicating which labels should be programmatically associated with which controls. A [talk I went to recently](https://twitter.com/CasseyLottman/status/1143569638783168512) advised getting into this level of detail during the spec process, so accessibility concerns can be found much earlier than code review time.

Some of the things the author is asking for in their design tool are available out of the box if you design in HTML & CSS directly. I don't know how feasible that is for designers' workflows, though.
- Things like being able to test how the screenreader will actually hear things (did that label actually get associated with the checkbox, or does the screenreader not know to connect them?) and "did we put the right amount of alt text on the images we're using so meaning is communicated but not cluttered with decorative stuff?"

## User Testing on Accessible Client-Side Routing Techniques
Folks at GatsbyJS wrote their experience running [user testing for accessibility on client-side routing techniques](https://www.gatsbyjs.org/blog/2019-07-11-user-testing-accessible-client-routing/). The question is, how should an app indicate to a user that something they did caused the page to change underneath them? 
 > "These tests were a good reminder that accessibility goes beyond support for screen readers, which make up a limited percentage of user needs. Support for screen magnification in web apps, for example, is very important to support a larger population of users with low vision."
 
One awesome thing I found while auditing the Glitch community site for accessibility is that we're already very viewport-responsive. I didn't find any issues with navigating the community site from a desktop browser at 200% zoom.

## Screenreader users on Mac probably use Safari, not Chrome
I typically test screenreader functionality on my Mac with the Chrome browser, since I know Firefox has a lot of compatability issues. What I didn't realize was that Chrome also has a lot of compatability issues with screenreaders. After I ran into one (the tab crashed if I navigated too quickly using Voiceover), a colleague referred me to the [WebAIM screenreader survey](https://webaim.org/projects/screenreadersurvey7/). I learned there that in 2017, only 1.4% of screenreader users use VoiceOver with Chrome, while around 10% use VoiceOver with Safari. I should probably switch to Safari when I'm doing testing from OSX. 