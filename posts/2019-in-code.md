---
layout: post
title: "2019: A year of many apps"
date: 2020-01-02
tags: [posts, reflection, glitch]
social_description: "Cool Apps I Made & Projects I Worked On"
redirectsFrom: "/posts/2020-01-02-last-year-in-code/"
---

I coded quite a bit this year - I'm a full-time software developer, after all. I didn't just code for work, though - this year, like last year, I branched out and also wrote code outside of projects that were strictly for work. It certainly helps that Glitch encourages employees to spend some work time working on whatever personal projects we'd like, as long as we build on Glitch. While not all of the work for these projects took place during my work day, you'll notice that most of them were built on Glitch, because Glitch makes it easy to start creating new things based on a starter project ("remix" in Glitch parlance) and get something instantly on the web without thinking about hosting at all.

## Accessibility Audit (for work)

In my work at [Glitch.com](https://glitch.com), I was most excited this year to work on an accessibility audit for the parts of the site my team is responsible for, that is, everything except the editor portions. Through the audit and tackling the implementation of accessibility improvements, I gained a deeper understanding of how to make sure the web is accessible to all users. I even returned to my alma mater as a guest lecturer on accessibility for a Design Studio class.

## Eleventy

This year was the first time I used [Eleventy](https://www.11ty.dev/docs/), and I ended up using it for a lot of different sites. Eleventy is a Javascript [static site generator](https://davidwalsh.name/introduction-static-site-generators) created by a [fellow Nebraskan](https://twitter.com/zachleat). I like how easy it is to customize and how fast it is, but most of all, I love that it's written in Javascript, which is a language I use all the time. After moving off Wordpress.com, I first created my blog using Jekyll, a Ruby-based static site generator, but it's been years since I worked regularly with Ruby. I have an almost-working copy of my site ported to Hugo, but since I know even less Go than I do Ruby, it was frustrating to work with and I never finished.

### This Site

Speaking of which... this site is now built with Eleventy! It was ported over in August from Jekyll hosted on GitHub Pages, and it now lives in Netlify. I never got around to adding a search feature, but the tagging system is much more flexible and easy to maintain than it was in the Jekyll version. Also, I didn't notice until too late that the generated URLs use a slightly different format than the old blog did, so there's a lot of broken links out there, mostly on my Twitter and Facebook. Other than that, I'm quite happy with how the site turned out.

### TIL Blog

Starting in June, I kept track of things I was learning about tech on an Eleventy site I built called [cassey-til](http://cassey-til.glitch.me/). The site also contains some learnings I recorded before creating the site, which I had been storing in a GitHub repository. Want your own **T**oday **I** **L**earned blog? Head over to Glitch and [remix my "TIL-Blog" project](https://glitch.com/~til-blog/)! I set it up so it will be easy to add your own author info and blog title, and you'll start with a blank slate in the posts directory. Follow the instructions in the readme for what to do after remixing.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I remembered my forgotten TIL repository, inspired by <a href="https://twitter.com/jbrancha?ref_src=twsrc%5Etfw">@jbrancha</a>. Updated it with a few months of learnings I&#39;ve shared in Slack, and stood up a site using <a href="https://twitter.com/eleven_ty?ref_src=twsrc%5Etfw">@eleven_ty</a> on <a href="https://twitter.com/glitch?ref_src=twsrc%5Etfw">@glitch</a> to show them off and keep them organized. <br><br>v productive Tuesday Glitch time!<a href="https://t.co/ymn7nByz3A">https://t.co/ymn7nByz3A</a></p>&mdash; Cassey Lottman (@CasseyLottman) <a href="https://twitter.com/CasseyLottman/status/1135987812258463744?ref_src=twsrc%5Etfw">June 4, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### [Link Trees with Eleventy](https://glitch.com/~link-tree-11ty)

I built a few link tree-style sites this year, that is, standalone sites with nothing but a list of links on them. After building the first one, when I wanted to make another, I would remix a previous site and then edit a bunch of CSS colors, meta tags, and of course, the links themselves. After going through this manual process enough times, I created [a new template for my link trees](https://glitch.com/~link-tree-11ty) using Eleventy. It pulls info for the meta tags and page title from a metadata file, and info on each link is pulled from a Javascript file and formatted uniformly into HTML.

My link trees from this year include [a list of the best stories captured by local activists in Lincoln, Nebraska](https://lincoln-politics.glitch.me/), [a list of my favorite artists](https://art-i-like.glitch.me/), and [a list of resources on digital community health & moderation](https://casseys-community-health-resources.glitch.me/).

## Browser Extensions

### [Glitch App to Project Extension](https://glitch.com/~app-to-project-extension)

At the end of May, I worked on a browser extension to make it easy to go between the various representations of a project on Glitch: the project page (glitch.com/~soulpatch), the editor (https://glitch.com/edit/#!/soulpatch), and the running app (soulpatch.glitch.me). I [blogged about creating the App to Project extension](/glitch-app-to-project-ext/), but the initial app was much more limited in features. It would take you from an app to a project page and vice versa, but not the editor. And, it only worked in Chrome. Later, I modified it to add a context menu that lets you choose which page you want to go to from any of the other pages, and made it run in Firefox. A coworker helped refactor the app and fixed a few bugs with it. Overall, the extension works great (I still use it basically every day) and it was a great learning experience.

### [Pinboard Extension](https://pinboard-extension.glitch.me/)

My first ever browser extension, built this year, was a simple extension to enable me to save the page I'm viewing to [Pinboard](https://pinboard.in). Pinboard is a bookmark manager I use to keep track of interesting stuff I find online. Its documentation includes code for a bookmarklet (a snippet of code that you drag to your bookmarks bar in Chrome, which will then run when you click it) to save new links to Pinboard. I don't like bookmarklets though - I prefer to keep my bookmarks bar hidden. So, I took the code from the bookmarklet and made it into a browser extension! [Get the Pinboard extension for Chrome](https://chrome.google.com/webstore/detail/pinboard-it/mafapkanfcjklkaloepbphjpmfefobbj) or [for Firefox](https://addons.mozilla.org/en-US/firefox/addon/add-to-pinboard/).

## Progressive Web Apps

### [Share-to-Pinboard Progressive Web App](https://pinboard-pwa.glitch.me/)

I built my first progressive web app this year, once again writing code to facilitate my use of Pinboard. Progressive web apps are websites that can do special things on mobile. When you add this Pinboard PWA to your home screen on Android (you'll see a prompt to do so when visiting the site on a mobile browser), it adds an option to the native share menu (those options you see when you go to share a tweet or a web page) that makes it easy to add something to your collection of bookmarks on Pinboard.

## Tools

### [Airtable as a Newsletter CMS](https://airtable-newsletter-cms.glitch.me/)

This is one of the most useful things I built this year - an app that, in conjunction with Airtable, functions as a CMS for [my housing & streets policy newsletter](https://tinyletter.com/cassey). I [wrote about the app more extensively already](https://dev.to/casseylottman/building-a-mini-cms-with-node-handlebars-and-airtable-128p), but basically, it uses the Airtable API to pull in records marked as 'Next Newsletter' in a specified base, and passes those records as data to a Handlebars template that outputs HTML I can paste into TinyLetter, so every newsletter is sent with a consistent format.

### [Duplicate a Spotify Playlist](https://copy-spotify-playlist.glitch.me/)

In September, I was listening to the Spotify playlist of Lizzo songs curated by Lizzo (or someone on Lizzo's staff at least) all the time, but some new remixes of a few songs were added, and I didn't enjoy them as much. I liked all the other songs on the playlist, though, and copying them over one-by-one sounded tedious. So, I built a little utility app where you can log in with your Spotify account, enter a playlist name and the identifier of a playlist you want to copy, and the app will create a new playlist on your account with all the same songs as the playlist you copied. Then, you can go into Spotify and add/remove songs at will.

When I was first learning to code I kept seeing advice like "write code that solves a problem you have!" but I could never think of any problems I had that had a code-able solution. While I don't encounter problems like this every day, I do have a running backlog of app ideas now.

### [Threaded Tweet Viewer](https://tweet-thread-show.glitch.me/)

Initially intended to be used on threads of tweets full of cartoons and memes, this app shows a thread one panel at a time using the Twitter API. I finished it on March 26, 2019.

### [Date Night Idea Generator](https://lnk-dates.glitch.me/)

I found a bunch of good uses for AirTable this year. For example, I created a base and filled it full of things I might plausibly want to do on a date in or around Lincoln, along with some metadata like if it involves being outdoors and what category of date I'd consider it. Then I made this little app to display a random record from that base from a given category. Work on this app happened between July 19 and July 22 of 2019.

## Just for Fun

### [Tally Cat](https://tally-cat.glitch.me/)

I finished a website for Tally, so she can have one just like her brother [Soul Patch](https://soulpatch.glitch.me)!

### [My Best Friend Liz](https://best-friend-liz.glitch.me/)

This app was easy - I remixed an app another user (and later, Glitch team member!) created that [displays a random grid of gifs alongside some text](http://celebrate.glitch.me/). I just needed a few modifications to the gif search terms and some different text options, and I had a site! I did end up adding a bit more customization though, so that I could source my "facts" about Elizabeth Warren from the Twitter user who initially made the claim.

### [A Neopets PetPage I Created Around 2005](https://dearlisathegreat.glitch.me/)

Okay, I didn't really write this code this year - but I did, at long last, manage to log in to my old Neopets account, so I could find out the name of one of my pets and see the petpage I created sometime around 2005. I encountered code for the first time on Neopets.com - the virtual pet world allowed users to create a static site for each pet, and even had comprehensive text-based lessons on HTML for users like me to learn from. You can't see my original pet page unless you're logged in to Neopets.com - so I grabbed the HTML while logged in and brought it into the light. I think this probalby wasn't the only site I had, just the final iteration of the one that survived until now.
