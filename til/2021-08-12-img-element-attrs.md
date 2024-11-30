---
tilTags: ["html"]
title: "Deep dive into img attributes"
description: "What are they all really for?"
date: 2021-08-12
---

For a 6-week "Professional Learning Community" initiative at [work](https://unabridgedsoftware.com), I'm in a group focused on learning more about [Eleventy](https://www.11ty.dev/), especially using Eleventy for images, and best practices for images on the web in general. 

This week my task for the group was to investigate the various properties that could be set on `img` and what, precisely, the most useful ones mean. Here are my notes, which are largely sourced from [the MDN docs on the `img` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).

## `img` Attributes
- `width`/`height` - when set, the browser will leave space for the image before it loads so the content doesn't do a visual jump
- `alt` - used by visually impaired users and users browsing in a non-graphical browser, but also used for things like when the image is copied & pasted as text. Alt may also be shown if the image fails to load for some reason. alt='' is valid and indicates that the element is purely decorative or not key to the content of the page (like a tracking pixel). If alt='' and the image fails to load, browsers won't show the broken image indicator. 
- `loading`: `eager` vs. `lazy`. Eager is the default, and indicates the image should load immediately. `lazy` means the browser will attempt to defer loading until the image is a calculated distance from the viewport, saving bandwidth. 
  - deferred loading only happens when javascript is enabled, as a privacy measure so sites can't snoop on scroll position using strategically placed lazy loading images
- `sizes`: must be used in combination with `srcset`. 
  - one or more strings separated by commas. Each string consists of a media condition that describes properties of the viewport, and a size of image that should be used when that condition is met. 
  > For example, `(max-height: 500px) 1000px` proposes to use a source of 1000px width, if the viewport is not higher than 500px.
  - each width of image listed in `sizes` should be present in `srcset` 
  - the last element in the list should have no media condition
- `srcset`: one or more strings separated by commas, with possible image sources for the user agent to choose from. each string has a url to an image, and optionally, whitespace followed by a width descriptor (positive integer followed by `w`) or pixel density descriptor (positive floating point number followed by `x`). If no descriptor is specified, the source gets a default descriptor of `1x`.
  - use either all width descriptors or all pixel density descriptors in the same srcset, don't mix them. And don't have duplicates for a given descriptor either
- `object-position` positions the image within the elements display box 

From the [`object-fit` attribute docs on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- `object-fit` adjusts the size of the image within the box. 
  - `contain`: content is scaled to maintain its aspect ratio while fitting into the content box as entirely as possible. Content is ['letterboxed'](https://en.wikipedia.org/wiki/Letterboxing_(filming)) if it doesn't fit exactly
  - `cover`: like contain, but instead of letterboxing, the object will be clipped to fit if the aspect ratio of the content doesn't match the object ratio of the box
  - `fill` - entire object will completely fill the box. object will be stretched to fit if the aspect ratio doesn't match
  - `none`: content is not resized
  - `scale-down`: content is sized as if `none` or `contain`, whichever would result in a smaller object



