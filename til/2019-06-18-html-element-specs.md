---
tags: ['post', 'accessibility', 'html']
title: The HTML Element Specification and Accessibility
date: 2019-06-18
---

I'm reading [the WHATWG HTML Specification on 'Element Definitions'](https://html.spec.whatwg.org/multipage/dom.html#element-definitions) to learn more about what constitutes valid HTML, so that I can correct HTML parsing errors on Glitch.com to support our goal of eventually reaching WCAG 2.1 AA compliance for accessibility. 

When I found in the [Accessibility Insights Chrome Extension](https://accessibilityinsights.io/) that one of the steps to check was that the HTML was valid according to the spec, I thought perhaps this might be an advanced technique. Accessibility-minded developers know that it's better to use elements that have the right semantic meaning, but surely following exact prescriptions on what kind of nesting is allowable is a much more advanced technique? To my surprise, [Success Criteria 4.1.1: Parsing](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html) is a Level A criteria in WCAG 2.1. (in broad terms, that means it's part of the most basic set of things a site should do for accessibility). 

## The main parsing errors that matter are:

1. incorrect use of start and end tags, 

2. invalid attributes on elements, and 

3. duplicate ID values.


## Checking for Parsing Errors 
To check for parsing errors as a result of these issues, you can use the [Nu HTML Checker](https://validator.w3.org/nu/) provided by W3. The [Nu HTML Checker About page](https://validator.w3.org/nu/about.html) lists two tools, both by Steve Faulkner, that make finding parsing errors that affect WCAG Level A compliance easier. 
 1. First run this <a href='javascript:(function(){function c(a,b){var c=document.createElement("textarea");c.name=a;c.value=b;d.appendChild(c)}var e=function(a){for(var b="",a=a.firstChild;a;){switch(a.nodeType){case Node.ELEMENT_NODE:b+=a.outerHTML;break;case Node.TEXT_NODE:b+=a.nodeValue;break;case Node.CDATA_SECTION_NODE:b+="<![CDATA["+a.nodeValue+"]]\>";break;case Node.COMMENT_NODE:b+="<\!--"+a.nodeValue+"--\>";break;case Node.DOCUMENT_TYPE_NODE:b+="<!DOCTYPE "+a.name+">\n"}a=a.nextSibling}return b}(document),d=document.createElement("form");d.method="POST";d.action="https://validator.w3.org/nu/";d.enctype="multipart/form-data";d.target="_blank";d.acceptCharset="utf-8";c("showsource","yes");c("content",e);document.body.appendChild(d);d.submit()})();'> bookmarklet to check the serialized DOM of the current page in Nu</a>. It will show you all the parsing issues on your page, even if your HTML is rendered with Javascript because you're using a framework like React (or Knockout.js because you're an old school cool kind of person).  
    - If you use the Nu HTML Checker by just entering in the URL of your live site, you make not be checking the full content of the page if significant HTML is created or appended using Javascript.
2. Then, in the Nu HTML Checker window that just opened as a result of the bookmarklet in step 1, run this <a href=''>bookmarklet to filter the list of failures to only those that are important to WCAG 2.1 level A compliance</a>. 
    - Remember, those are incorrect uses of start and end tags, invalid attributes on elements, and duplicate ID values. 
 

## Element Definitions

Elements in the HTML spec each have [a definition composed of many parts](https://html.spec.whatwg.org/multipage/dom.html#element-definitions). Each element is in a set of _categories_, that determines which _content models_ and _contexts_ an element has. 

Elements also have a description of whether the start or end tags can be omitted as part of their definition, as well as a list of attributes that can be used on the elements and a description of those attributes. Finally, the element definition includes a description of what the element is supposed to represent, occasionally with examples.

### Content Model??

My initial intuition was that a content model was what category actually represents - what kind of element is this? Instead, content model in the HTML specification means what kind of elements can be inside the element being described. 

An element has an allowable context, which is another way of talking about what other elements have this element in its content model. 

   - As an example, think of a bedroom. The content model of a bedroom is what categories can go in it- like "things to sleep on" or "things to store things in". House elements that might fit in those categories might be "bed" or "dresser". The _context_ of a bed (and the whole category, "things to sleep on") is where elements of that category can be placed - you can put them in a bedroom. The _context_ of a bedroom is where it can be placed - in elements of the world with the category "places to live", like a house or an apartment. 

Sometimes an element has [a content model of "nothing"](https://html.spec.whatwg.org/multipage/dom.html#the-nothing-content-model), and that means the element must contain...nothing! Inter-element whitespace is okay, though.

### Categories

There are a variety of categories that elements can fall into, which are nested quite fancifully. (See [the interactive HTML category Venn diagram from W3](https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content)). 

- **Metadata content:** sets up the presentation or behavior of the rest of the content, or the relationship of the document with other documents. 
- **Flow content:** a very broad category that contains elements used in the body of documents and applications.
- **Sectioning content:** content defining the scope of headings and footers. This includes `article`, `aside`, `nav`, and `section`.  
- **Heading content:** headers of sections! `h1` through `h6` and a new-to-me friend, `hgroup`. [1, 3]
- **Phrasing content:** the text of a document, and elements marking up text inside a paragraph. 
- **Embedded content:** content that imports another resource into the document, like `canvas`, `embed`, `iframe`, `img`, `svg`, etc.
- **Interactive content:** content specifically intended for user interaction. 

### Attributes

I have learned a few interesting things by looking at the failures I found on a page I was testing for correct parsing in the Nu Html Checker. 

- An `iframe` element does not have the `alt` attribute, so one place where we tried to set helpful information for users using the `iframe alt` was probably not really that helpful to users whose assistive technologies didn't expect to find descriptive content in the `alt` tag. Instead, we switched the description to the `title` attribute of the `iframe`. [Learn more about how the accessible name is supposed to be calculated by assistive technologies on an iframe](https://w3c.github.io/html-aam/#iframe-element-accessible-name-computation). Note that `alt` doesn't factor in at all!
  - Title is an attribute that exists on all elements! 

## Conclusion

I'm learning a lot about the HTML spec and what _valid, semantic HTML_ really means! I thought I had a pretty solid understanding but by reading the spec and some guidelines on accessibility as relates to writing semantic HTML, I am learning so much more. 

<br/>
<br/>

[1] - `hgroup` is included in the WHATWG version of HTML but has been removed from the HTML5 (W3C) specification, [according to MDN's page on `hgroup`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup). BRB while I figure out the difference between the HTML5 Spec and the WHATWG spec that I've been reading all day. [2]
[2] - Okay back, I learned [from this Reddit discussion on the difference](https://www.reddit.com/r/javascript/comments/5swe9b/what_is_the_difference_between_the_w3c_and_the/)  but not clearly enough to recap it myself. 
[3] - After sharing this post, I heard feedback from others that `hgroup` is basically not supported anywhere, and because of that, can make screenreader experiences worse than if you'd left it out altogether. So BYE, FALSE FRIEND!