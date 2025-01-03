---
tilTags: ["design", "css", "accessibility"]
title: "Adjusting site colors for better contrast"
description: ""
date: 2020-11-07
---

I picked my own color palette for the redesign of cassey.dev, and this [site called Contrast-Ratio.com](https://contrast-ratio.com/) was helpful in resolving a pesky contrast issue between the background color I was originally using and the link text. 

Since I used HSL color encoding, I could adjust each component value of each color up or down, and get a related color to what I started with, as I tried to hit that sweet [4.5:1 contrast ratio](https://www.w3.org/TR/WCAG/#contrast-minimum) for better accessibility. 

(I should add: I was reminded why HSL colors are so great, and lots more, by reading [Refactoring UI](https://refactoringui.com/book/) while I was working on the re-design.)

## update: one day later!

I came across this post on [designing an accessible color palette with magic numbers](https://darekkay.com/blog/accessible-color-palette/) by Darek Kay, which outlines a really great approach to defining a new palette that has consistent contrast ratios that can be easily understood by designers and developers. If you're starting from scratch on a palette, check it out! 