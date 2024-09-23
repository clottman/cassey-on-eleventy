---
layout: post
title: Tips for Running 11ty on Cloudflare Pages
tags: ['posts', 'eleventy']
description: 'Decap CMS & Eleventy Auto Cache Buster'
date: 2024-09-07T14:26:00-05:00
---

This week I designed & built a new 11ty site to support an advocacy effort among primarily Canadian zine creators opting out of a major Canadian zine festival due to the founder's genocide denial. It's called [Can't Zine](https://cantzine.ca).

This is the first Eleventy site I've hosted on Cloudflare Pages, and there were a couple small hiccups to work out. Overall though, the setup process was pretty painless, and now that I have these two issues figured out, I think it will be smooth sailing to move the rest of my sites over there!

## Decap CMS

This site needed a CMS backend of some kind so that my zine-world co-conspirator could add to the site's creator listing without much fuss. I like [Decap CMS](https://decapcms.org/) (formerly called Netlify CMS), which gives you a nice lil graphic frontend to add content to your site. The new content is committed directly to your repo as plain text files, which 11ty is a champ at using as [data](https://www.11ty.dev/docs/data-global/) to create pages. The CMS is locked behind an authentication system so only approved contributors can access it.

I've used Decap on several other projects before, but only on sites hosted on Netlify using Netlify Identity to do the auth. As you might guess, the project formerly called Netlify CMS has great docs on how to use it when hosting on Netlify. I knew it was probably possible to host elsewhere though and use a different identity provider, but wasn't sure quite how.

I ended up using [Netlify-CMS-Cloudflare-Pages by i40west](https://github.com/i40west/netlify-cms-cloudflare-pages) to set up GitHub-based oauth for Decap CMS as a Cloudflare Pages function that's part of my site. I followed the readme instructions and it worked perfectly out of the box basically. There are other repos (and many forks of the same repos...) that do a similar thing using Cloudflare Workers; I liked that this one was coupled as a function that I could easily keep in the same repo so everything I need to run the site is in one place. 

## Very Aggressive Asset Caching

I learned that Cloudflare will cache your non-html assets overly aggressively if you don't set a query string on them - after every deploy, my site kept showing an old version of the CSS with a very obvious & embarrassing visual bug until I clicked "purge cache" in Cloudflare, and then it would come back again after the next deploy anyways. Ahh!

I added the plugin [Eleventy Auto Cache Buster](https://www.npmjs.com/package/eleventy-auto-cache-buster) which promised to add query strings to all my assets in the site without any extra work (or changing what was in my template files at all), and that seems to have solved the problem for good. 

I've never dealt with this before on Netlify or worried about query strings on assets there for my simple, no-bundler sites, so this was a frustrating surprise! I'm sure it is great for making my site speedy-quick for end users, but I would prefer a miniscule-ly slower site that always looks presentable over a very fast but embarrassing site!

But now that I know about it, I will make sure any other sites I put on Cloudflare use the Auto Cache Buster plugin, and go back to not thinking about this at all, hopefully.

## WWW settings

If you want your blog to be available at both myblog.com and also www.myblog.com, make sure to set it up properly in Cloudflare! I didn't at first and this was broken for a while but no one really noticed apparently.

Make sure to do this under your site's Workers & Pages settings, under "Custom Domains". You should end up with two entries (at least) here, one for myblog.com, and one for www.myblog.com. When you enter the www version, Cloudflare will add the DNS records you need to make it work. 

Note: You _can't_ only add the DNS CNAME or A record yourself, manually, for the www version, and have it work! It needs to be set in the Custom Domains area of the Pages configuration as well.
