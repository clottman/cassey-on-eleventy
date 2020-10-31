---
til-tags: ["post", "html"]
title: "Make your twitter cards look nicer"
description: "summary and summary_large_image are not created equally"
date: 2020-03-27
---

Today I remembered that I made a change recently to how Twitter cards are rendered when I share a link on cassey.dev, but did not make the same tweak on cassey-til.glitch.me. 

Before, when I shared posts from cassey-til.glitch.me on twitter, the card looked like this: 

<img src="https://cdn.glitch.com/238f8585-6bd5-40c4-a0ff-2b87d4acea6c%2Ftweet-min.png?v=1585333312240" alt="a tweet containing a link, with the link picture (an apple on a stack of books) very stretched out looking" width='300' />


That was because I had a meta tag on my page like this: 
```
<meta property="twitter:card" content="summary_large_image">
```

The meta tag should use `summary` as the value instead since my social sharing image is square. Like this: 

```
<meta property="twitter:card" content="summary">
```

Now my tweets look like this when I share a link: 

<img src="https://cdn.glitch.com/238f8585-6bd5-40c4-a0ff-2b87d4acea6c%2Fwell-behaved-tweet.png?v=1585333601179" alt="a tweet containing a link, with the link picture (an apple on a stack of books) not stretched out" width='500' />

See [Twitter docs about Summary With Large Image](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image) vs [docs about the Summary card](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary).

