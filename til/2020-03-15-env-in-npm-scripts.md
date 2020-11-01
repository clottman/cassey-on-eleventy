---
til-tags: ['javascript']
title: 'Referencing an .env value in an NPM script'
description: 'The more you $KNOW!'
date: 2020-03-15
---

Today I wanted to reference a value from .env in an NPM script, so I learned how!

I wanted a script I could run from the editor console of [cassey-til.glitch.me](https://cassey-til.glitch.me), that would hit a [Netlify webhook](https://docs.netlify.com/configure-builds/build-hooks/) to rebuild [cassey.dev](https://cassey.dev). It's important that only I can run the script, though, so I can't just put the URL right in package.json where anyone can see it. 

I know that on Glitch, [.env is a safe place to keep secrets](https://glitch.com/help/env/). So, I stored my webhook URL there, like `NETLIFY_BUILD_URL='secret'`. 

Then I added a line to package.json's scripts section to run the curl command that activates the webhook. It took some research to get the syntax right, but eventually I had `"publish-dev": "curl -X POST -d {} $NETLIFY_BUILD_URL",` and it worked!

Gonna run it as soon as I finish this post, so that this post will appear on both [cassey-til.glitch.me](https://cassey-til.glitch.me), and [cassey.dev/til](https://cassey.dev/til). Huzzah! 