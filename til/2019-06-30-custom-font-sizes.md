---
til-tags: ['post', 'css', 'accessibility']
title: More People Set Custom Font Sizes than Use Internet Explorer
description: If you're setting font sizes in pixels, you're overriding that preference.
date: 2019-06-30
---

Reading [Every Layout on "Units"](https://every-layout.dev/rudiments/units/), I came across a link to [an analysis of how many users set custom font sizes in their browsers](https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773). 

Informal research on users of a particular site shows that as many as 3% of users set custom font sizes in their browser options. That's a higher percentage than is usually reported as using browsers with low market share, like Internet Explorer, Edge, or Opera Mini. 

If you set font sizes in your site using pixels, those user preferences for a different font size are being overridden. (Custom font sizes are typically bigger, to accommodate low vision, but might also be smaller to fit more content on the screen.) Pixel-based font-sizes in CSS are absolute, where as `rem` and `em` font sizes are relative to the default font size set in the browser. So, if you want to be more inclusive and respect user preferences, you should use `rem` to set font sizes and `em` to set font sizes as a proportion of the `rem`-calculated values. 