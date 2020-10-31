---
til-tags: ['css']
title: 'Deep-diving the CSS Cascade'
date: 2020-01-24
---

I knew that a major feature of CSS is the "C", or cascade. I know some stuff about how the cascade works - mostly that it involves specificity, and that if specificity is the same, stuff defined later takes precedence. 

I read [this beautifully designed article by Amelia Wattenberger about the CSS cascade](https://wattenberger.com/blog/css-cascade) and learned a few more things!

First, there's more to the cascade than just specificity. We also need to consider importance, origin, and position, in that order. Importance mostly has to do with prioritizing styles related to transition or animation, but it's also where `!important` comes in. Origin refers to where the style comes from - the website, the user, or the browser. (Typically, website styles override user styles and browser styles.) 

Within [specificity](https://wattenberger.com/blog/css-cascade#specificity), there are 4 levels. (Inline, id, class/attribute/psuedo-class, and element type/pseduo-element).

> "One thing to note about levels on this tier is that **the number of hits on the highest-reached level matter**."

So, if selector A has one id and selector B has zero ids, A will win. If A has an id and no classes, and B has no ids and five classes, A still wins! 

> "Additionally, on this tier of the Cascade, **ties can be broken within this tier.** This means that, if two rules have the same number of hits on their highest level, one can win by having a hit on the next level down."

The last factor of the CSS cascade is position - the order the styles were defined in. This only matters if all the other factors are equal. (An element defined later, but with greater specificity, will win. But if there are two elements with the same specificity, the one defined later will win.)

