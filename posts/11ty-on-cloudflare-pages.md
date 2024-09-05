---
layout: post
title: Tips for Running 11ty on Cloudflare Pages
tags: ['posts', 'eleventy']
description: ''
date: 2024-09-05T14:26:00-05:00
---

I used [Netlfify-CMS-Cloudflare-Pages by i40west](https://github.com/i40west/netlify-cms-cloudflare-pages/tree/main) to set up the GitHub authentication for Decap CMS as a Cloudflare Pages function that's part of my site; I followed the readme instructions and it worked perfectly out of the box basically. 

I learned that Cloudflare will cache your assets overly aggressively if you don't set a query string on them - after every deploy, my site kept showing an old version of the CSS with a very obvious & embarrassing visual bug until I clicked "purge cache" in Cloudflare, and then it would come back again after the next deploy anyways. I added the plugin [Eleventy Auto Cache Buster](https://www.npmjs.com/package/eleventy-auto-cache-buster) which promised to add query strings to all my assets in the site without any extra work (or changing what was in my template files at all), and that seems to have solved the problem. I've never dealt with this before on Netlify or worried about query strings on assets there, so this was a frustrating surprise!
