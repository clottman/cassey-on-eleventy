---
tilTags: ['react']
title: Speed in Function Components
date: 2019-03-02
---

I’d been wondering about whether my function components in React (using hooks) would be slow due to creating functions within my function component. (in the render, basically). Dan Abramov on Twitter pointed me to [this entry in the FAQ which answers that question](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render). 

tl;dr: not really!