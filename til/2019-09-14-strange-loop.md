---
til-tags: ['conferences', 'accessibility']
title: 'Learnings from Strange Loop'
date: 2019-09-17
---

I attended a conference called Strange Loop in St. Louis last week. I don't have notes or thought on every talk I attended, but here were a few I enjoyed most. 

## Accessibility

[Ian Forrest](https://twitter.com/ianforr) gave [a talk on accessibility](https://www.youtube.com/watch?v=pNcB7ChyO1E). 

I learned that in high contrast modes, often overlays will appear to be floating on top of the page with no outline, since high contrast modes make the backgrounds all one color. You can add `border: 1px solid transparent` to the overlay container to make sure there will be a visual distinction between the overlay and the background.

Ian talked a bit about curb cuts and how they were originally conceived for people with disabilities who use assistive technology (wheelchairs), but ended up helping lots of other people (people with grocery carts and strollers, the elderly, etc). He likened how awful it would be to remove curb cuts for aesthetic reasons to how awful it is when website designers remove link underlines or focus outlines for aesthetic purposes. Those features are affordances so people with varying ability levels and ways of using the computer are able to understand what they're doing on the web. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;I don&#39;t like the way curb cuts look so let&#39;s remove them to make the intersection more aesthetically pleasing&quot; - how you sound when you want to remove link underlines without thinking it through, or disable focus outlines. <a href="https://twitter.com/hashtag/a11y?src=hash&amp;ref_src=twsrc%5Etfw">#a11y</a> by <a href="https://twitter.com/ianforr?ref_src=twsrc%5Etfw">@ianforr</a> at <a href="https://twitter.com/hashtag/strangeloop?src=hash&amp;ref_src=twsrc%5Etfw">#strangeloop</a></p>&mdash; Cassey Lottman (@CasseyLottman) <a href="https://twitter.com/CasseyLottman/status/1172898309217902595?ref_src=twsrc%5Etfw">September 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Alt Attributes

Remember: all images need alt attributes but not all need alt text inside those attributes.

On a list of books, are the cover images adding something to the page that isn't already there, or are they just decorative? If they're decorative, don't make your alt text `cover of bookname`. Just make it a decorative image by adding `alt=""`.

That book cover image? If it's decorative but also a link, and the link is a duplicate of a link whose text is the book title, make the image link aria-hidden so screenreader and keyboard users don't get fatigued by the repetition. 

## Artificial Unintelligence: How Computers Misunderstand the World

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">There are a lot of talks on machine learning and AI that I&#39;ve been avoiding at <a href="https://twitter.com/hashtag/StrangeLoop?src=hash&amp;ref_src=twsrc%5Etfw">#StrangeLoop</a> because I don&#39;t believe the hype that AI will save us. This one by <a href="https://twitter.com/merbroussard?ref_src=twsrc%5Etfw">@merbroussard</a> on &quot;how computers misunderstand the world&quot; is more up my alley. <a href="https://t.co/J9EEtPklyI">pic.twitter.com/J9EEtPklyI</a></p>&mdash; Cassey Lottman (@CasseyLottman) <a href="https://twitter.com/CasseyLottman/status/1172876898499735556?ref_src=twsrc%5Etfw">September 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/merbroussard?ref_src=twsrc%5Etfw">@merbroussard</a> asks &quot;Who says math &gt; people?&quot; <br><br>White male mathematicians from a very small group of prestigious schools.<a href="https://twitter.com/hashtag/strangeloop?src=hash&amp;ref_src=twsrc%5Etfw">#strangeloop</a> <a href="https://t.co/ieiyRiJoyO">pic.twitter.com/ieiyRiJoyO</a></p>&mdash; Cassey Lottman (@CasseyLottman) <a href="https://twitter.com/CasseyLottman/status/1172881658346901504?ref_src=twsrc%5Etfw">September 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Meredith gave an overview of what people usually mean when they say artificial intelligence (that is, machine learning) and why its powers are more limited than most people believe. 

She also talked about bias in algorithms due to bad training data and the lack of diversity in the field. In 2017 there were 0 women in the Harvard faculty as senior mathematicians. But this bias goes back centuries, and the idea is that math is special and doesn't need to be concerned with the petty social concerns of other disciplines.

Computer science is a descendant of mathematics. It has inherited the biases of its predecessors, so we have bias embedded in the technology we build.

## Streets

Strange Loop was located in downtown St. Louis, and though it was a dense, under many definitions "walkable" area, as a pedestrian going between conference venues, restaurants, and my hotel I did not feel very safe. One car, travelling fast through a left turn, came within a couple feet of hitting me as I used a crosswalk. Many crosswalks either had no pedestrian signaling or a pedestrian signal that didn't work. There were intersections with pedestrian signals permanently set on "Don't Walk" that never seemed to change, and had no button I could find to indicate that someone was waiting to cross. 

## How To Teach Programming
[Felienne](https://twitter.com/Felienne) gave a wonderful keynote on "how to teach programming". Many programmers are self-taught and just "figured stuff out", so we assume that everyone can just "figure it out" and that this is a good way to learn. But programming isn't special - research in the best way to help people learn applies to programming, too! Felienne laid out some of that research including original research on programming education. 

## CSS Algorithms

[Lara Schenck](https://twitter.com/laras126) gave a great talk on CSS Algorithms which covered a lot of ground, including "what is a programming language" and how CSS meets most definitions of one. She has [a blog post on CSS Algorithms](https://notlaura.com/writing-css-algorithms/) that covers a bit of what the talk got into, but the full video is worth a watch, when it comes out.

## Learning to Love JavaScript

My coworker [Tara Vancil](https://twitter.com/taravancil) gave a great talk on ["Learning to Love JavaScript"](https://www.youtube.com/watch?v=OyTJCMytx9k&feature=youtu.be). As she mentions, the shortcomings of JavaScript have been discussed at length in public, so she talked about some of the strengths of JavaScript that make the web platform the creative, open, decentralized place it is.

## Community Driven Development

Christine Zagrobelny gave a talk on [Community Driven Development](https://www.youtube.com/watch?v=5htAAL0cc_w&feature=youtu.be), or what she has learned as the primary tech contributor to an organization helping immigrants file asylum cases and work within the American immigration system. It had good insights for open source maintainers and developers and product managers wanting to work with cause-based organizations. It led me to reflect on how I'm using my time, which is something I've been thinking a lot about over the last few weeks. What impact am I making outside of work, and how can I make that impact sustainable? 

## Tweet My Wedding Dress

[Jo Franchetti](https://twitter.com/thisisjofrank) gave a talk on how she built a wedding dress that has embedded lights that change colors based on tweets to a specific account that contain a color word. It was an interesting lesson in building wearable devices, hardware hacking, and creativity. 

## Voice Driven Development

[Emily Shea](https://twitter.com/yomilly) gave a talk on ["Voice Driven Development"](https://www.youtube.com/watch?v=YKuRkGkf5HU), about how she uses voice dictation to control her computer and code, after developing severe RSI. It was eye-opening to learn how doable voice-controlled coding is (though it took her a month to learn and develop speed).


## Imogen Heap

Imogen Heap was the ending keynote speaker. She talked about problems in the music industry (especially around how creators get paid) and how tech can help. She also demoed and performed with her fancy gloves that she uses to make music. She also talked a bit about being a new mom (several years ago) and how that affected her career. She once wrote a song that used the beat of her breast pump as the tempo. 

The whole thing was quite inspiring! 

<blockquote class="twitter-tweet"><p lang="sv" dir="ltr">Imogen Heap at <a href="https://twitter.com/strangeloop_stl?ref_src=twsrc%5Etfw">@strangeloop_stl</a> <a href="https://twitter.com/hashtag/strangeloop2019?src=hash&amp;ref_src=twsrc%5Etfw">#strangeloop2019</a> <a href="https://t.co/GwtdfdlndM">https://t.co/GwtdfdlndM</a> <a href="https://t.co/4yxb0xqHOS">pic.twitter.com/4yxb0xqHOS</a></p>&mdash; Mike Bridge @ StrangeLoop (@michaelbridge) <a href="https://twitter.com/michaelbridge/status/1173051155448029185?ref_src=twsrc%5Etfw">September 15, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

