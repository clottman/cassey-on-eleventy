---
til-tags: ['glitch', 'devtools']
title: Getting your Glitch Project Domain in Your Code
description: Or, the magic of built-in env variables
date: 2019-06-24
---

If you are creating a project on Glitch intended for other people to use, sometimes you might want to include a reference to the name of the current remix in your project. 

## Where did the value come from? 

Node has a built-in environment variable system that you can access on the server-side using `process.env.VARIABLE_NAME`. In Glitch, you can set your own environment variables using the `.env` file in your project. (No one can see your .env values except members of your project, by default.) Glitch _also_ gives you some built-in environment variables. 

One of those built-in variables is PROJECT_DOMAIN and one is PROJECT_NAME. [PROJECT_NAME is around for legacy reasons](https://support.glitch.com/t/project-name-project-domain/1672), and you should prefer using PROJECT_DOMAIN. 

## How does my HTML know? 

I'm using Eleventy to build this site, so my process for getting a variable to the server was particular to Eleventy sites. Depending on how your site renders HTML via a server, you will probably use a slightly different process. See [my write-up on how I did it in Eleventy](/til/2019-06-24-project-domain-as-env/).

## I love built-in environment variables, what other ones exist??
See [what other environment variables are available by default in a Glitch project](https://glitch.com/help/project/).

See even more by running `printenv` in the Glitch console - some of these are Node defaults, not Glitch defaults. 