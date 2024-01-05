---
title: "Using Obsidian for Notes & Research Projects"
date: 2023-11-22
tags: [posts, recommendations, tools]
social_description: "if you like writing markdown, you might like this tool"
redirectsFrom: "/posts/2023-11-22-notes-on-obsidian/"
---

There are a lot of different tools out there that you can use to write notes. There are apps that are very basic, like Google Keep, and apps that are very advanced with fancy rich text features and custom block types you can use, like Notion. 

One app that I've tried in the last few months and really liked is called Obsidian.

## What is Obsidian? 

### a way to write lots of Markdown files
Obsidian is a note-taking or knowledge management app where your files are all stored in Markdown, meaning if you decide you don't want to use Obsidian any more, you can easily use your files anywhere else - it's not a custom format that is going to be a pain to import into some other tool, or cause you to lose data if you do. 

### it's private
Privacy is emphasized - by default, your files are stored only on your device, not in the company's cloud. (You can use their paid cloud sync service to sync your files between devices- in those cases the files are end-to-end encrypted.) 

One downside I've found - there's no way to password-protect an individual vault (set of files). If someone has access to your Obsidian app, they can see all your files! Since I often hand my unlocked phone to my partner who I generally trust, but don't want stumbling upon my feelings-journal by accident, I've kept that journal in Day One. I could potentially get around this by password locking the Obsidian app as a whole with a separate password from my device, but that's not my preferred solution.

### customizable
Obsidian is very customizable - there are a _lot_ of different plugins you can add, and settings to make the experience match what works for you. 

### closed source, but not an ad funnel or data breach
Obsidian is _not_ open source, but many plugins are. (If open source is an important priority for you, check out [Logseq](https://logseq.com/)) The company behind it makes money from commercial use licenses and add-on services (like the Sync service I have paid for & been happy with (though I'm currently not a subscriber), and a Publish service to put your notes on the web), not from selling your data or pushing ads. 

## My Review

I like using Obsidian a lot; I am comfortable writing markdown so that feels very fluid for me. It has tags (created with just putting a `#` symbol in front of a word wherever you want, or you can tag a note using the new-ish properties feature that gives you some frontmatter for your notes (a section of more formatted key-value pairs at the top of the markdown file). You can create in-line links to other notes very easily. Including links to notes that don't exist yet! And then when you're ready to fill in that note, it will already be linked.

(Example: I am writing a note on Topic X; I add a link to a note for a person I want to interview that doesn't exist as a note yet, and later come back to fill in the note for that person. When the note is actually created, the link that I initially created in Topic X starts working. (think Wikipedia!))

The backlink feature is really cool - they show you what notes link to the note you're looking at. So when I look at my interviewee note, I might see backlinks to all the topic notes that I mentioned that person in. They can even tell you if you have unlinked mentions - places where some other note uses the title of your current note, but doesn't link it.

{% img "raw_img/obsidian_post/backlink-bottom.png", "a screenshot showing that the current note has 1 backlink, along with the word count of the note", 300, "center-block margin-bottom" %}

{% img "raw_img/obsidian_post/backlink-unlinked.png", "a screenshot from Obsidian showing the linked mentions (a reference to a link titled Common Root in a note called Occupy Lincoln) and unlinked mentions (a note called Dandelion Network contains the name Common Root without linking it)", 300, "center-block margin-bottom" %}

The mobile app works great on my Android phone, and the markdown editing UX on both desktop & mobile is really nice in my opinion - probably my favorite markdown editor I've used. Instead of a side-by-side view, you see the raw markdown when your cursor is on that line or word, but when you move on to the next token (word for things like bolding, or line for headers), it shows the text as formatted instead.

{% img "raw_img/obsidian_post/side-by-side.png", "a screenshot from Obsidian showing two test notes side by side. In one, a heading reads 'Wow what a nice note' in a large font. In the note on the right, this heading text is prefixed with two hashtag symbols", 600, "center-block margin-bottom" %}

(Okay, in this picture I'm showing my notes side-by-side to explain the difference - but you don't have to do that! See how my cursor is on the heading on the right note, and that lets me see the raw markdown and edit it? But when my cursor is elsewhere, it's just plain markdown? Yeah. It's nice)

You can also enter "reading mode" and look at your notes in formatted markdown, without the ability to edit. I've found this useful for screensharing my notes as an impromptu presentation for work, without fearing that I'll mess something up with a misclick while I'm talking.

Another feature I really like is the canvas feature, not to be confused with the graph view. Graph view makes a generated map of how your notes are connected by links in the text. It's fun to look at for sure! But I haven't found it very useful for anything, really. 

{% img "raw_img/obsidian_post/graph-view.png", "a screenshot from Obsidian divided in half. The right shows a note titled Test Note that contains a link in the body text to something called 'other text note'. The right side shows circles, one labeled Test Note and the other labeled Other Text Note. They are connected by a line", 600, "center-block margin-bottom" %}

Canvas is way cooler, because you can rearrange your notes and group them or draw lines between them in a way that makes sense to you, whether or not there are links between them in the text already. You can see the full text of the note right on the canvas, and even edit an individual note from the canvas view, or you can zoom out and just see the title of each note. Note that the canvas is not a normal markdown file, and probably won't be of much use to you if you stop using the Obsidian app. But, I've found it really useful for drawing connections and finding new relationships between the things I'm thinking about.

{% img "raw_img/obsidian_post/canvas.png", "a screenshot from Obsidian showing a canvas that contains two notes, each connected by a line, and a card that is not a note, just some extra text", 600, "center-block margin-bottom" %}

The biggest downside of Obsidian for me is that you need to pay (or set up some possibly convoluted other system?) for Obsidian Sync at $8/month if you want to sync notes between Android & desktop. (Please tell me if I'm wrong about this and there's a non-sketch way to do it!)

Obsidian is also mainly designed for personal use, though there may be some collaboration plugins I just haven't found yet. If you need the ability to comment on notes that a team member made, or work more collaboratively in general, something like Notion may be a better fit. (If you wanted to just share a vault with infrequent updates by others, you could set up a workflow with git and pull requests perhaps. Your notes are just markdown, remember, and the files sit on your machine for you to do with as you please!)

I also haven't experimented much with editing tabular content in Obsidian. I know there are some plugins for this, but if I want to do data-heavy stuff, I just do it in Notion or Airtable instead (or I guess Google Sheets if I just want to add some numbers or something). My guess is that if your work is very table-driven, you may be happier with a different tool.
