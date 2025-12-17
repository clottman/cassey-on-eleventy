---
layout: post
title: Making a tweet roundup
date: 2020-03-16
tags: [posts, coronavirus, code]
social_description: "BuzzFeed does it better"
social_image: "https://cassey.dev/img/grimace-clown.jpg"
social_image_alt: "A grimacing clown emoji, from Emoji Mashup Bot"
twitter_card_style: "summary"
redirectsFrom: "/posts/2020-03-16-tweet-roundup-process/"
---
**Update 2025-12-17**: removed links to twitter and some code

I wanted to make [a post with a bunch of tweets](/coronavirus-memes/) on it. I've mostly embedded a single tweet at a time before, so this is new territory. Here's what I did. This is not an example for you to follow; it is perhaps more like a great example of how sometimes even great programmers like myself follow ill-advised workflows because it's the past of least resistance.

As a reminder, this site is built with Eleventy.

First, I knew it would be ideal to only include the JavaScript that turns some markup into a tweet widget once, despite multiple tweets on the page. I learned to do that on the Twitter for Websites docs. I put the script tag snippet they provide there in a nunjucks template in my \_includes/ folder, and referenced it in my post with `{% raw %}{% includes 'twitter.njk' %}{% endraw %}` My build immediately broke and I couldn't figure out why; I then realized the includes syntax is in nunjucks, but my post still had a `.md` extension. I changed the post file extension to `.njk` and things worked again.

Next, I need some tweet embed content. In the past, I've gone through the Twitter Publish GUI `https://publish.twitter.com/` to get the embed markup; for some reason after reading the Twitter for Websites docs I thought I needed to use the OEmbed endpoint on the API instead. So I did that.

My workflow here was to:

1. find a pandemic-related tweet in my group DM of memes & open it
1. copy the link from the address bar
1. in the browser console of another tab (yes it could have been the same tab at this point, but it wasn't), run `encodeURIComponent("<paste>")`
1. copy the encoded string I got back
1. open up VS Code where a snippet of unsaved code is waiting. Replace the encoded url string that's there from the last time I ran it with the new url string. Now I have a curl command that POSTs to the twitter oembed endpoint to get the embed for a tweet, and pretty-prints the output
   ``` bash
   curl $A_TWITTER_URL | json_pp
   ```
1. copy the curl command, paste it into my WSL terminal. See output like this: (2025 note: output removed)

1. copy the stuff in the `html` field out of the response.
1. open a random backslash stripper tool online, paste in the blockquote element I just copied, click to strip the slashes, copy the output (2025 update: WTF, 2020 me)
1. finally, paste the output into my blog post

If I did this again there's probably a lot I could change - maybe I'd have an app of some kind that could take a list of tweet URLs and make all the POSTs and do all the encoding and decoding. Maybe I'll find later that someone already built that very app, which I could have used. But maybe I'll never do this again, and this way is fine.
