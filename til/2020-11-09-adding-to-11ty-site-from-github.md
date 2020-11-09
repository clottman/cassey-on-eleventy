---
til-tags: ["tools", "eleventy"]
title: "How can I see my new blog post rendered before I deploy, if I don't have my whole dev environment?"
description: "Draft a PR on Github & use Netlify Deployment Previews"
date: 2020-11-09
---

Today I learned a new way to write today I learned posts! 

I publish this site using Netlify, and it's built with [Eleventy](https://www.11ty.dev/) and [hosted on github](https://github.com/clottman/cassey-on-eleventy). 

Sometimes I have want to publish a quick blog post when I'm not at my regular computer with my full development environment set up. (On a loaner laptop while mine is getting repairs, or, I don't know, on a short break from work, for example.) 

In the past I've written files directly in Github's web UI, which I merge directly to the primary branch (which triggers a deployment in Netlify). Today I realized that since I have [Netlify Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) enabled, I can make a pull request, and even add multiple files to it, all from github.com, and see what my site will look like when the posts get rendered, right from my browser, with no extra dependencies installed or running. Woo! 

## update 1
(today I might also have learned, using this feature, that the changes I pushed this weekend didn't deploy correctly. Oops. TIL to verify your deploys even if usually it /~just works/~.)

## update 2
(ok now I have learned something else - I made a separate pull request to fix the configuration bork that made the site not deploy. But now my netlify preview won't update - even if I try running the build again, it's like it's not pulling the latest changes from my primary branch to merge with, and it keeps failing with the same error. Luckily I have more text to add about it; I bet once I add this additional commit, the deploy preview will work.) 

## update 3
(ok that did not work, Netlify is still not updating. Guess I'll have to merge the primary branch into my PR branch manually, then push to update the PR in order to see my deploy preview)