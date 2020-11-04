---
til-tags: ["firefox"]
title: "Firefox Container Gotchas"
description: "Learning to use multi-acccount containers"
date: 2020-11-03
---

My new boss told me about [Firefox Multi-Account Containers](https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/) which I had heard of a while ago, but have never used. I started using them yesterday, and it's nice to have a set of tabs that are on the work gmail and a set of tabs on my personal gmail/for doing personal stuff.

## Keyboard shortcuts 
There are keyboard shortcuts I'm trying to get used to:
- cmd + shift + # (1 or 2 for me) gets you a new tab with the specified container
- ctrl + . gets you the container menu so you can tab to other options of stuff to do with the containers

I spent some time trying to figure out why a keyboard shortcut for re-opening the current tab in a different container wouldn't work, and eventually realized the page I was looking at for a list of shortcuts wasn't the actual Firefox add-on documentation. I had also seen that shortcut elsewhere on the web, like on StackOverflow, but maybe they were referring to an older version of the feature, who knows. 

## The default/no-name container is a container
A gotcha I uncovered: there's no way to set a different default container for new tabs. So, if you set out to have a Work container and a Personal container, you're going to spend a lot of time manually choosing a container for every new tab. Making it so a given site always opens in the specified container helps a little, but it's still a lot of manual work, or extra reloads because your default tab is 'no container' (really, an unnamed default container) and as soon as you navigate to a site that has an always-open container assigned, the tab will need to reload itself in that container. So, one workaround is to use the 'no container' default state as your actual default, rather than having Personal or Work or another named container be your default. Personally, on my work computer, I want most of my internet use to happen using work-related logins, with just a few sites in the Personal container, so I'm going to switch from using the Work container to using the no-container/default state for those sites. Shoutout to this [feature request issue from 2017](https://github.com/mozilla/multi-account-containers/issues/356) for laying out the issue.

## Managing Containers
Another gotcha: in the little options menu, when you click Manage Containers, each of the existing containers isn't just a read-only list item showing the container name - they're actually all buttons that will take you to a page to look at options for that container, like its name, color, and the list of sites currently set to always open in that container. From this page, you can also delete containers.
