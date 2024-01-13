---
layout: post
title: Frontmatter Templates for New Blog Posts
tags: ['posts', 'code', 'eleventy']
description: 'In VS Code, using Snippets'
date: 2024-01-13
---

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
			"date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
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
date: 2024-01-13
---
```