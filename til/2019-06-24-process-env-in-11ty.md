---
til-tags: ['post', 'eleventy', 'tools']
title: Using process.env variables in Eleventy
description: "Today I learned!"
date: 2019-06-24
---

In Eleventy (the static site builder used to create this site), you can [access Node environment variables (`process.env.MY_VARIABLE`) in your templates](https://www.11ty.io/docs/data-js/#example%3A-exposing-environment-variables). Neat! But how?

## How to set up the variables for use in templates 
The Eleventy docs provide a code snippet to use: 

```
module.exports = {
  myVariable: process.env.MY_VARIABLE
};
```

One thing you might overlook is the filename - this doesn't go in your `.eleventy.js` file, but in the special `_data/` folder at a Javascript file named of your choosing. I chose to call mine `_data/processEnv.js`. 

## How to access your variable in a template

Once you have an object exported from a Javascript file in `_data`, that object is available in your templates as `filename.variablename`. So in my Liquid (markdown) templates, I write: `{% raw %}{{ processEnv.myVariable }}{% endraw %}` to display the value stored at `process.env.MY_VARIABLE`. 

## See it in action

I'm using this technique in [the source code of another post on this site](https://glitch.com/edit/#!/{{processEnv.values.PROJECT_DOMAIN}}?path=posts/2019-06-24-project-domain-as-env.md:1:0), so check it out! You should be able to poke around the full source of my project to see how it's configured. The variable I'm using there is called 
`{% raw %}{{ processEnv.values.PROJECT_DOMAIN }}{% endraw %}`.