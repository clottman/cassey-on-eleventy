---
tilTags: ["react"]
title: "I'm reading: 'A (Mostly) Complete Guide to React Rendering Behavior'"
description: "I wish I had this a year ago..."
date: 2020-11-25
---

This piece by Redux maintainer Mark Erikson called ["Blogged Answers: A (Mostly) Complete Guide to React Rendering Behavior"](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/) is long, and I've only read through it halfway so far, but it's really interesting and informative.


## Multiple calls to a state setter & rendering behavior
I found it when researching React rendering, wondering about whether multiple calls to `setState` in a function would introduce performance issues. 

The answer I discovered is that calls to `setState` (by which I mean, the setter function returned from a `useState` hook, or `setState` on a class component) are batched into a single DOM update as long as the calls are being made in the context of a React event handler. A gotcha here is that if you await an async function in an event handler body, the code that executes after the `await` will be in a different event loop call stack, and so will _not_ have multiple calls to `setState` batched. So, you might end up with multiple renders and DOM updates in quick succession.

## What is rendering? 
One big thing I learned from this piece (in a helpful section called ["What is rendering?"](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#what-is-rendering) is that in the context of React, a render is not the same as one pass at applying changes to the DOM. Rather, rendering is the process of computing what the UI should look like. The resulting UI state may or may not get written to the DOM, depending on what changes happened, and what else happened while the render was going on. (Maybe user interactions or new data came in while the render was taking place, making that render pass obsolete.) The process of applying the changes to the DOM is known in React-world as the "commit phase".

> Rendering is the process of React asking your components to describe what they want their section of the UI to look like, now, based on the current combination of props and state. (Mark Erikson)

## Rendering behavior and Context
This is a complicated topic, with a fair bit of nuance that Mark lays out really well. 

One takeaway for me was something that Mark [quoted Sophie Alpert](https://twitter.com/sophiebits/status/1228942768543686656) on:

> That React Component Right Under Your Context Provider Should Probably Use `React.memo` (Sophie Alpert)

As [she explains](https://twitter.com/sophiebits/status/1228955237655834624)

> briefly: it lets you change the context value and rerender only the components consuming it instead of the entire subtree (Alpert)

This is necessary because by default, React will recursively re-render all child components after a parent component updates. `React.memo` is a kind of escape hatch to re-render the component only if its props and state changes. 





