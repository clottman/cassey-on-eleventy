---
layout: post
title: "Hosting your Static Site on Cloudflare: Tips & Tricks"
tags: [posts, code, eleventy]
description: ''
date: 2025-07-25T09:16:00-05:00
---

Over the last year or so I've been moving many of my static site projects (including this site) to the free tier of Cloudflare hosting, from their former homes at Netlify. 

## Why Cloudflare
I've been pretty happy with Cloudflare, and it's what I often recommend now for people looking for a static site host. I like the [AI/LLM crawler defenses](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots) I can turn on with a single toggle, and the confidence that while on the free tier, I'm not going to [wake up to a huge bill](https://www.reddit.com/r/webdev/comments/1b14bty/netlify_just_sent_me_a_104k_bill_for_a_simple/) if I suddenly start getting DDOSed while I'm sleeping. 

I also had an experience where Netlify disabled my entire account (including immediately taking down all my sites, including this one) without warning because my previous credit card on file was denied for one domain on auto-renew I had registered there. My account getting suspended was the first I had heard about an outstanding bill at all, let alone a payment issue - I got a reminder several months before that my auto-renew was coming up, letting me know my autopayment was set up, but no notice at all that the payment had in fact not gone through a few months later when the renewal happen. I'd already been leaning towards moving off Netlify due to the billing horror story I'd heard about before, but this was the last straw. 

So, I use Cloudflare now! And while I'm pretty happy with it, the UX is a lot less straightforward than on Netlify. In some ways that makes sense; Cloudflare has a lot of capabilities in its platform than Netlify, and a longer history of being the [enterprise solution that Netlify is trying to become](https://www.netlify.com/blog/enterprise-team-management/). In other ways the UX seems confusing in ways that I think could be fixed. But that's not my job, so here's some hints for working within the current setup instead!

## Cloudflare Products Overview

"Pages" (or Workers) is doing the bit that Github Pages might have done for you, or Netlify, or having your html files in an S3 bucket on AWS. It's actually hosting the files, possibly including running a build command, and has the configuration for things like connecting to a github repo to build automatically. 

The Domains part is only the DNS level settings to point your domain to the Pages project. (or maybe somewhere else! you can use Cloudflare DNS services without hosting your application there, and that's often what enterprise tier customers do - Cloudflare just provides a caching/CDN layer and spam protection at the DNS level.) And adding on confusion, the DNS settings can be fully managed in Cloudflare, or just proxy requests through to the DNS registration configured at wherever you got your domain from.

## UX Gotchas on Cloudflare
The main headache for me when I started with Cloudflare, until I figured out the secret and reliably remembered it, is that your settings for domains attached to your static site and your settings for the static site's code (connection to a git provider, build command for a static site generator, etc) are in two different sections of the site with different side navigations, and the navigation (on the side and up top) don't let you go from one to the other directly. Instead, you need to go back to the main "Account Home" setting by clicking your account name at the top of the page, and _then_ you can change between them. 

When you first log in to Cloudflare Dashboard, you see an "Account Home" page with three tabs across the main portion of the screen. One is Domains, and you should see your domain(s) there. The next is Developer Platform, and that is where you hopefully will also see the same sites as on the domains tab, with "Pages" next to them if they are static sites. (Or possibly "Workers"; it seems Cloudflare is putting functionality that was previously just known as Pages into the Workers product and encouraging people to migrate their static sites there.) 

If you start by clicking on one of the Developer Platform entries for a site, there isn't an obvious way to get back to your Domains without going back out to that Account Home page. The side nav links that refer to domain-related stuff don't take you there! And they might even make it seem like you don't have any domains in Cloudflare currently even if you do, with a page saying something like "add your first domain to Cloudflare to get started" even after you already have domains.

The same is true if you start on a domain - notice that you get an entirely different side nav in that case, with different links, but there's no way that I've found to go directly to your Pages/Workers applications that live in the Developer Platform area. There's also no indication on the Domains area header/navigation that you're even in a specific and siloed Domains area! To go back to Application Home, you need to click the text up top that says "Account Name's Account", which tells you only on hover will take you to Account Home if you click it. You may not even realize this is a link until you hover on it; I certainly didn't. 

For each of the sites in Developer Platform, there is a "Custom Domains" tab in the main section of the page. If you go to that Custom Domains section, and click the tri-dot menu next to one of the domains and then "Manage Cloudflare DNS", you'll get taken over to the Domains area to manage its settings. But then you may be confused again, because you can't seem to come back without backing out to Account Home!

## SSL, www. and other Domain Settings
Turning on SSL initially on each of my domains was a bit of a headache. I have SSL on now on all of them, so can't step back through to refresh myself on the specifics, but I believe there may be a setting both in the Pages part _and_ in the Domains part you need to turn on for SSL to work, and if you miss one side of that, it won't actually work.

If you want to have people able to get to your site from www.yourdomain.com with Cloudflare, in the DNS settings area, go to Rules on the sidebar, then click "Templates" and you can add "redirect from www to root" and even "redirect from http to https" if you want. I noted some more specifics on that [in my previous post](/11ty-on-cloudflare-pages/#www-settings). 

## Caching
Something to note if you're moving to Cloudflare from another static site host is that Cloudflare is much more aggressive at caching resources even after new builds of the site. I was finding my `application.css` files weren't getting updated after new builds that changed it, and having to do a forced/manual cache flush each time in order to see changes, which sometimes didn't even seem to work! As I described in my post on [moving 11ty to Cloudflare Pages](/11ty-on-cloudflare-pages/#very-aggressive-asset-caching), I added a plugin to my [11ty](https://www.11ty.dev/) site to automatically add file name hashing to my static assets like CSS and JavaScript (if I had any) for caching purposes, and haven't had a problem since.
