---
til-tags: ['css', 'accessibility']
title: 'My first look at Bulma for CSS'
description: "If you care about accessibility, you might want to look elsewhere." 
date: 2019-07-22
---

I wanted a simple UI library for making a simple page with a simple form prettier. So I tried out [Bulma](https://bulma.io/)! My take is that in my quick usage/perusal of the docs, it seems awful for accessibility and not great for developer experience, either.

It's also a library that relies on Sass, and my project only used Handlebars and Express/Node. So I had to figure out how to compile Sass and serve it from a Node project. I thought about adding a bundler to my project, but since it was already working just fine with Handlebars and simple templating, that felt like too much overhead. I found a starter app called [Example-Scss](https://glitch.com/~example-scss) on Glitch where I was able to get the gist of what I needed to add to my `server.js` file to make it work. 

``` javascript
var sassMiddleware = require("node-sass-middleware");

app.use(sassMiddleware({
  src: __dirname + '/sass',
  dest: '/public'
}));
```

Since I was already serving the `public` directory using `express.static`, that's all I needed to do! 

I did have some accessibility concerns with Bulma while using it on my simple form.
- none of the form examples show an example of how you’d use a label with it, only placeholder text. Labels are non-negotiable when it comes to making an accessible form (placeholders aren't read by many screenreader/browser combinations), so they should have first-class support in a CSS library's form controls section.
- all of the buttons listed [on the button documentation page](https://bulma.io/documentation/elements/button/) are actually anchor tags styled to look like buttons, which is sometimes appropriate but definitely not always. For accessibility, you should choose the right tool for the job. See [my post on the differences](https://{{processEnv.values.PROJECT_DOMAIN}}.glitch.me/posts/2019-06-25-link-vs-button-a11y/).

Also, the CSS for almost everything is applied by wrapping the element you actually want in a div and putting a class on that div, which feels super messy