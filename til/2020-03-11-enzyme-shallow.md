---
til-tags: ['post', 'react', 'testing']
title: 'Testing Modern React with Enzyme Shallow'
description: 'A Litany of Woes'
date: 2020-03-11
---

# A Litany of Woes

## tl;dr: 
I learned recently that the only way to use Enzyme to test a React component that relies on a `useContext` hook appears to be to use `render` or `mount`, not `shallow`.

## More details:
I've been helping some coworkers with thorny questions about testing React components lately, and found some surprising issues I hadn't seen blogged about elsewhere. Specifically, let's dive in to testing with the `shallow` render method from Enzyme.

Assumptions you can make for this post include: 
- I'm talking about React with hooks, so 16.8+
- I'm talking about using the Adapter from Enzyme for testing
- I've tested with mochapack and jest and gotten the same results
- I am not an expert, nor a maintainer of any of the above libraries. 
- I do use React for work, and have a basic familiarity with React testing libraries.

### General Concerns about `shallow`
Famous JavaScript guy Kent C. Dodds says to [never use shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering), and he doesn't even mention the `useContext` weirdness I'm about to describe. He makes some great points; I recommend giving it a read.

### If I do use `shallow`, I still can use `React.Context`, right?

[The docs for `shallow`](https://enzymejs.github.io/enzyme/docs/api/shallow.html) imply that you can still use context in shallowly rendered components, by providing the `wrappingComponent` option. ***This is misleading.***

> `options.wrappingComponent`: (`ComponentType` [optional]): A component that will render as a parent of the node. It can be used to provide context to the node, among other things. See the getWrappingComponent() docs for an example. Note: wrappingComponent must render its children.
> `options.wrappingComponentProps`: (`Object` [optional]): Initial props to pass to the wrappingComponent if it is specified.

The only way to test a component with Enzyme that relies on a `useContext` hook appears to be to use `render` or `mount`, not `shallow`.

I made [a CodeSandbox of every method I could think of to potentially use `useContext` with `shallow`](https://codesandbox.io/s/priceless-driscoll-j45bv), all of which fail. (The tests that pass use `mount` or `shallow` or no Context at all.)

Later, I found this [longstanding issue in the Enzyme repository describing this exact issue](https://github.com/enzymejs/enzyme/issues/2176). 

Here's [a helpful comment from another user with suggested workarounds](https://github.com/enzymejs/enzyme/issues/2176#issuecomment-532361526); 
here's [a maintainer confirming that fixing this would take substantial effort and probably won't happen](https://github.com/enzymejs/enzyme/issues/2176#issuecomment-532461718). 

### What about context from React-Redux?
You might think you can avoid this by using React-Redux as your context provider, instead of React's built-in context. You might think this is supported, since the code sample in [the Enzyme docs for ShallowWrapper:getWrappingComponent](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/getWrappingComponent.html) show exactly this. You would be wrong, since React-Redux now also uses `useContext` for its operations. I have a test demonstrating this in [my Code Sandbox repro](https://codesandbox.io/s/priceless-driscoll-j45bv). (Look for "can use a react-redux provider"). (h/t to coworker Greg, who separately stumbled on this problem this week, for pointing this out!)

I hope this post saves you time and frustration. (No fewer than 3 members of my team spent several hours each on this, just this week.) Happy testing!