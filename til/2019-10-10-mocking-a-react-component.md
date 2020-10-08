---
tags: ['post', 'react', 'testing']
title: 'Mocking a React Component with Sinon'
date: 2019-10-10
---

I'm working on writing component tests for React at work. Mocking several layers of Context + Redux + React-Router has been a difficult chore! I couldn't figure out how to mock `IntersectionObserver`, so I decided to mock the React component that used IntersectionObserver instead. (It's not the thing I'm trying to test). 

A quick excerpt from my testing stack dependencies: 

```
    "chai": "^4.2.0",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.14.0",
    "jsdom": "^15.1.1",
    "mocha": "^6.2.0",
    "mochapack": "^1.1.5",
    "sinon": "^7.5.0",
```

Now some code: 

```
// the real IntersectionObserverComponent
const IntersectionObserverComponent = (props) {
  const observer = new IntersectionObserver();
  ... do something
  return <div>{children({isVisible: stateValue, wasEverVisible: anotherStateValue)}</div>
} 
export default IntersectionObserverComponent; 
```


```
// App.js
import IntersectionObserverComponent from './intersection-observer-component';

const App = () => {
  <IntersectionObserverComponent> 
    {({isVisible, wasEverVisible}) => (isVisible ? <h1>Hello!</h1> : null)}}
  </IntersectionObserverComponent>
}
```

```
// in the test file, we mock IntersectionObserverComponent imports using sinon
import * as IntersectionObserverComponent from 'Components/intersection-observer-component';
import 'sinon'; 
​
class FakeIntersectionObserverComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>{this.props.children({ isVisible: true, wasEverVisible: true })}</div>
    );
  }
}

it('mocks intersectionObserverComponent', function() {
  // THIS CODE DOESN'T REALLY WORK, see below
  const intersectionObserverComponentStub = sinon.stub(IntersectionObserverComponent, 'default');
  intersectionObserverComponentStub.returns(FakeIntersectionObserverComponent);

  const wrapper = mount(<App />);
})
```
Note on the above - we're using the pattern `import * as X` because we're using ES6 modules with Webpack & Sinon. You can [read more about this importing trick here](https://railsware.com/blog/mocking-es6-module-import-without-dependency-injection/).

Great setup, right? Well, running the test file will throw a warning. 

When we get to the part of App that uses IntersectionObserverComponent, we'll see a warning like this: 

```
Warning: Functions are not valid as a React child. 
This may happen if you return a Component instead of <Component /> from render. 
Or maybe you meant to call this function rather than return it.
```

Why? 

Well, as my coworker Osmose explained to me, the way we configured the `returns` function for the stub of IntersectionObserverComponent, we're configuring it to return a reference to the class FakeIntersectionObserverComponent, which compiles to a function.  

What we need to do instead is change our Sinon stubbing code to this: 

```git
-    intersectionObserverComponentStub.returns(FakeIntersectionObserverComponent);
+    intersectionObserverComponentStub.callsFake((props) => new FakeIntersectionObserverComponent(props));
```
(- means get rid of the line like this, + means add a line like this in its place)

As Osmose explains, the `returns` way of doing the stub means the stub basically acts like this: 
```
function visibilityContainerStub(props) {
  return FakeVisibilityContainer;
}
```
That's why it's getting a reference to a class, and not something that React can instantiate. 
