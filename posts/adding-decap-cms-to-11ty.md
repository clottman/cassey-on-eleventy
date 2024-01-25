---
layout: post
title: Adding Decap CMS to 11ty
tags: ['posts', 'code', 'eleventy']
description: ''
date: 2024-01-13
---

I've been wanting a way to add posts in markdown to my 11ty site from my Android phone, without using a 3rd party CMS. I'm going to try out Decap CMS (formerly Netlify CMS) to do this, and tell you what I do to get it set up in this post.

## My requirements:
 - I don't want to host a separate server, just static files on my current host, Netlify.
 - I want to be able to draft posts in Markdown, and have them live right alongside my other Markdown file posts that I've drafted from my laptop.
 - I don't care a lot about adding images to posts I draft on mobile, but it could be nice.
 - I have an Android phone.

I've looked at various options for commiting to a Git repository from Android, and most of them kinda suck. GitHub has a web interface that isn't too terrible that I have occasionally used to push minor copyedits to an existing post, but it's not as smooth as I'd like for drafting entirely new posts.

## Assumptions:
I have an existing site that was built with 11ty, so I won't be able to start by copying one of Decap's templates. 

I am hosting my site on Netlify, with the code living on GitHub. If your site is located somewhere else, some of these steps may be different for you.

I have used Decap CMS before for client projects, though I wasn't the original person who set those up. So, I am vageuly familiar with how it works.

## Adding Decap CMS to my Existing 11ty Site

I'll be following [these docs from Decap](https://decapcms.org/docs/add-to-your-site/). 

### Creating & Configuring the Admin folder
The first thing the docs say to do is create an admin folder in the place where static files go. The docs suggest that is `_site/` for Eleventy. That's... kind of true? `_site/` is the default build output folder, but it would be a bad idea to add a new folder there directly. Instead, I'm going to add an `admin/` folder in the root of my project, and add a passthrough file copy instruction to my 11ty config to make sure it gets placed in the `_site/` folder at build time.

```javascript
// add to .eleventy.js
eleventyConfig.addPassthroughCopy("admin");
```

I have created two files in my new  `admin/` directory, `index.html` and `config.yml`. 

I left `index.html` alone after copying what the docs say should be there. I customized my `config.yml` so it looked like this: 


```yml
backend:
  name: git-gateway
  branch: main
media_folder: "raw_img/uploads"
collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "posts" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime", time_format: false, date_format: "YYYY-MM-DD", format: "YYYY-MM-DD"}
      - {label: "tags", name: "tags", widget: "list", default: ["posts"]}
      - {label: "Body", name: "body", widget: "markdown"}
```

### Setting up Netlify CMS

I went over to my site's dashboard in Netlify, and under Integrations then Identity, clicked on Netlify Identity. I enabled it. Then under configuration, I changed a few things:
 - Set Registration to **Invite Only**. 
    - Netlify has a generous-for-my-purposes 1000 user limit on the free tier for Netlify Identity. Woo! I had assumed I'd need to pay to use it at all. But I don't want to pay for spammers - so I need to make sure that I & only I will be able to log in!
 - Add GitHub as an external provider for authentication. You could skip this, if you want, but it seems nice.
 - Enable Git Gateway. 
    - Other than the part where we make sure we won't get charged $99 for a bunch of spam accounts signing up, this is actually the most important step here.

At this point, the instructions from Decap tell me to go add some code to both index.html and my site's main page - so I'll do that now. 

I also need to invite myself to Netlify Identity for my site, which I can do [from a different page](https://docs.netlify.com/security/secure-access-to-sites/identity/registration-login/#invitations) than where I've been changing settings. 

I did that & clicked the invite link in my email- oops, it redirected back to my site, which doesn't have any Netlify Identity code on it yet! Time to commit & push my changes so they go live, I guess.

Okay, I did that, and then I clicked the link in my email again. I don't see any visual confirmation that it worked really, but when I refresh in Netlify, I see that I have a new user. Cool!

### Trying it out
Now I'm going to go to the admin route on my site (`cassey.dev/admin`) and see what happens. First it prompts me to log in with Netlify Identity. I do that, using my GitHub account.

I see a page with all my blog posts listed!! This is awesome!! 

{% img "raw_img/decap-cms/posts-list.png", "a list of Cassey's blog posts in the Decap CMS UI", 450, "center-block margin-bottom" %}

I can add a new blog post but I'm kinda scared - I want to try enabling the editorial workflow so I can see a draft/deploy preview before I make an actual new post. 

I add this line to `admin/config.yml` and push it up: 
```yml
publish_mode: editorial_workflow
```

{% img "raw_img/decap-cms/drafting-post.png", "Cassey is drafting a post in the decap CMS UI, that says she is writing it with Decap", 450, "center-block margin-bottom" %}

When I hit "Save", Decap made a [new pull request](https://github.com/clottman/cassey-on-eleventy/pull/33) to my site, and Netlify made a deploy preview for the PR. 

The deploy preview looks great, I could publish this now if I wanted to! 

## Next Steps
I want images on my site to be processed by 11ty Image. Up til now I've only been using a custom shortcode for 11ty Image, but when I put an image in Decap, it's inserted as a standard markdown image instead. 

I found [this post on processing all markdown images with Eleventy Image in 11ty sites](https://www.martingunnarsson.com/posts/eleventy-automatic-image-pre-processing/) by Martin Gunnarsson which pointed me to a plugin to add to my markdown-it config - `markdown-it-eleventy-img`. 

I'm already using another markdown-it plugin, mardown-it-anchor. So I should add another `use` declaration for the new plugin. 

```javascript
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const markdownItEleventyImgOpts = {
    imgOptions: {
        outputDir: '_site/img/'
    }
}

module.exports = MarkdownIt(options).use(
  markdownItAnchor,
  markDownItAnchorOpts
).use(markdownItEleventyImg, markdownItEleventyImgOpts)
```

You'll want the `module.exports` syntax only if you have your markdown library config in a separate file, like I do. 

Otherwise, you'll probably have something like this, like [Martin](https://www.martingunnarsson.com/posts/eleventy-automatic-image-pre-processing/) does:

```javascript
 eleventyConfig.amendLibrary('md', mdLib => mdLib.use(markdownItEleventyImg, {
        imgOptions: {
            outputDir: '_site/img/'
        }
 }));
```

Note that the only config here for Eleventy Image I've added is the output directory, matching where my existing Image shortcodes place the images. I'm going to stick with the other defaults for now, but might come back and change that, later.

When I added this config and tested adding new posts from the CMS with images, the markdown-it-eleventy-img library was stumbling during the build step on the absolute path that the images used. So, I added this line to my `admin/config.yml`:

```yaml
public_folder: "raw_img/uploads"
```

Public_folder specifies where the images are placed in your project repository; media_folder specifies what the path for the image in your markdown file should be.

Note the setting I'm adding is identical to the `media_folder` setting, but Decap's default behavior is to insert a slash prefix onto the `media_folder` path when using it as `public_folder`, which I don't want. 

### Final Thoughts

I've been looking for an easy way to create new posts on my 11ty site from my Android phone for a long time. The other solutions I'd thought of seemed annoying- an [Airtable](/11ty-airtable-fetch) or Notion API-backed workflow; maybe [Sanity CMS](/sanity-with-existing-eleventy-site). 

On Mastodon [people tell me](https://hcommons.social/@ryanrandall/111750890401531928) [they use Working Copy](https://pdx.social/@jcontonio/111750332346749423) with great success on their iPhones; I don't have an iPhone though, and there doesn't seem to be an equivalently awesome Git app for Android phones currently. 

Overall, adding Decap CMS to my 11ty site was way easier than I expected it would be, and since I've known about Decap/Netlify CMS for a long time and work with it with some regularity at work, I'm not sure why it didn't come to mind before as a solution to this problem!

I am hopeful this is going to be a really good workflow for me to keep adding new posts to my site. May 2024 be (another) year of the blog!


## Update 1-14-23: Better Mobile Responsiveness

Decap's CMS UI is not particularly optimized for mobile, but with a lot of horizontal scrolling, it does the job. Someone in the 11ty discord pointed me to a [long-standing GitHub issue](https://github.com/decaporg/decap-cms/issues/441) where this has been discussed. Until the Decap team releases a UI update they've been promising is coming for years now, some folks are using a [CSS override script](https://github.com/hithismani/responsive-decap) to clean things up just enough on mobile. I added it to my `index.html` using the JSDeliver link, tested it out, and it seems to be doing the job!
