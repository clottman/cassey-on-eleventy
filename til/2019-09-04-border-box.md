---
tilTags: ['css']
title: 'I read: "Meet Border-box, my best friend."'
date: 2019-09-04
---

Today I read a short article on a subject I knew at one point, but feels fresh to remember. 

The article was [Meet border-box, my best friend](https://dev.to/ameseee/meet-border-box-my-best-friend-a56).

It describes the difference between `box-sizing: border-box` and `box-sizing: content-box`. 

Basically, `content-box` means that only content (and not padding & borders) use the height & width values on the element. 

When `border-box` is the value for `box-sizing`, a div that is set to say, `width: 200px` and has a 6 pixel border will actually be 200 pixels from border edge to border edge, not 212 pixels like it would be if you were using `content-box`. 

Good reminder! 