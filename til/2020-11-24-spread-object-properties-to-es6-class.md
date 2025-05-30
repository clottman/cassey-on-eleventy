---
tilTags: ["javascript"]
title: "How to make your Javascript class instance have all the properties of some other object"
description: "Call Object.assign(this, yourObject) from within the class"
date: 2020-11-24
---

## tl;dr: 
```js
class MySpecialClass {
    constructor(objectFromServer) {
        Object.assign(this, objectFromServer);
    }
}
 ```

## more details 
Inspired by the book ["Refactoring: Improving the Design of Existing Code"](https://martinfowler.com/books/refactoring.html) by Martin Fowler, I am starting to use ES6 classes in javascript more to organize code. 

I'm working with some legacy code that gets some data from the server as JSON, and then uses the objects from that data all over the place, accessing many properties. The properties being used aren't necessarily all the properties that come from the server, and those server-side properties might change someday, too. I'm also making the switch to using a class to represent this data slowly, without converting everything immediately to an object-oriented design that strictly relies on manually defined getters and setters. 

So, I decided to create a class to represent the model. But how do I get all of the properties from the JSON object as properties on my new class instance? I had trouble internet searching the answer to this problem, but the important keyword that got me there was 'spread' - as in, [how might I spread the properties of an object on to a class instance](https://stackoverflow.com/questions/46273256/how-to-spread-an-object-into-a-classes-properties-in-javascript/46273310#46273310)?

The answer relies on `Object.assign` and uses `this` as the first parameter, or the thing that the properties from the second parameter will be assigned to. You might be used to seeing `Object.assign({}, someObject)` used to clone `someObject` into a new object - but here, we want `this` as the first parameter, which in the constructor of our class, refers to the instance of the class that's being created. 


## even more code 
Here's a code sample I wrote to test it out, which you can head over to [JSFiddle](https://jsfiddle.net/k9bypq85/1/) to test out.

```js
const serverObj = {
 something_special: 1,
 something_else: 2,
 another_thing: 3,
 server_name: 'Person Cassey',
};

class MySpecialClass {
 constructor(objectFromServer) {
   Object.assign(this, objectFromServer);
 }
 
 greet() {
  console.log("Hi, " + this.server_name);
 }
}

const myInstance = new MySpecialClass(serverObj);

myInstance.greet();
// will print Hi, Person Cassey
```
