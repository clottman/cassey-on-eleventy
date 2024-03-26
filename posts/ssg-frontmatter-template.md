---
layout: post
title: Frontmatter Templates for New Blog Posts
tags: ['posts', 'code', 'eleventy']
description: 'In VS Code, using Snippets'
date: 2024-03-26T12:35:00-05:00
originally_posted: 2024-01-13
---

**Updated 3-26-2024:** Added timestamp to date [to make my RSS feed better](https://rknight.me/blog/eleventy-post-dates/)

I have been thinking for a long time that it would be nice to have a script that would easily scaffold out the [frontmatter](https://www.11ty.dev/docs/data-frontmatter/) for a new post on my blog (aka this site). I thought I'd need to write a node script or something, and so haven't done it.

But, I realized there is a much simpler way to do this in my code editor of choice, VS Code: [Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)!

In the command palette (cmd + shift + p), I selected "Configure User Snippets", then created a new global snippets file scoped to the workspace. That creates a file in the `.vscode` folder where my snippet will go. This is rather handy; if I commit that file in git as part of my website, the nice snippet I am making will follow me to any new machines where I am working on this site in VS Code, without extra configuration.

Here is what I put in my snippet: 

```json
{
	"add post frontmatter": {
		"prefix": "frontmatter",
		"scope": "plaintext,markdown,html",
		"body": [
			"---",
			"layout: post",
			"title: $TM_FILENAME_BASE"
			"tags: ['posts']",
			"description: ''",
			"date: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:00-05:00",
			"---",
			"$2"
		],
		"description": "Add frontmatter for new post"
	},
}
```

Note that 'html' is the [VS Code language identfier](https://code.visualstudio.com/docs/languages/identifiers) that is used in my current setup when I'm working in a Nunjucks or Liquid file. 

Now when I have created a new file to add a new post to, I can start typing `frontmatter` and then tell the editor to autocomplete, which fills out a nice new frontmatter entry that I can fill in. 

If I haven't saved the file yet, I'll get something like `Untitled-1` as the title; if I have, I'll get the file slug instead. I'll get today's date, and a placeholder for the description and tags I might want to add, as well as the tag I need for all my posts in the blog section. 

Neat!!

```yaml
---
layout: post
title: ssg-frontmatter-template
tags: ['posts']
description: ''
date: 2024-01-13T12:29:00-05:00
---
```

A note on dates: We want our date to be a [valid format for Eleventy frontmatter dates](https://www.11ty.dev/docs/dates/) and we want to make sure our RSS feed doesn't get jumbled in order if we make two posts on the same day. (Thanks [Robb Knight for raising the alarm on this!](https://rknight.me/blog/eleventy-post-dates/)). So we should make sure the date we're using includes the actual time. I'm hard-coding my time zone offset because whatever, close enough. Maybe you want to do something different here - tell me about if so! And if you don't live in US Central time, probably you want a different offset at the end.

Note I spent _way_ too much time debugging my snippet here because somehow I ended up with the wrong kind of dash in my snippet file. If you're having trouble with a format that seems like it should be right but isn't working when you do the snippet vs typing it in by hand, be sure to watch out for that!

{% img "raw_img/gremlin-character-snippet.png", "a screenshot of the snippet file in VS Code, with a tooltip warning the user that a possibly incorrect character was used that looks like a normal dash but isn't", 450, "center-block margin-bottom" %}