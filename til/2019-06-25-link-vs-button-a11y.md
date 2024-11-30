---
tilTags: ['html', 'accessibility']
title: Impact of Accessibility on Link vs Button in HTML
description: Does it matter? If so, which one to use?
date: 2019-06-25
---

Today I read [this blog post on the difference in link and button in HTML and why it matters](https://marcysutton.com/links-vs-buttons-in-modern-web-applications). I've learned much of this before, but I want to make sure I am remembering the fundamentals correctly while I make suggestions about accessibility improvements on the site I work on.

## Key differences

Buttons (`<button>`) and links (`<a>`, also known as anchors) are intended to be used for different purposes in HTML, and they have different ways that you interact with them.

> The starkest difference between a link and a button to me is that a link navigates the user to a new resource, taking them away from the current context (internal links are the only wrinkle here). A button toggles something in the interface, like a video player; or triggers new content in that same context, like a popup menu using aria-haspopup. ([Marcy Sutton](https://marcysutton.com/links-vs-buttons-in-modern-web-applications))

<table>
  <thead>
  <tr>
   <th>Button</th>
   <th>Link</th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>Used for toggling an interface or interacting with the current page</td>
      <td>Used for navigating to a different page (or deep-linking in a complex client app)</td>
    </tr>
  <tr> 
    <td>Focusable by default</td>
    <td>Focusable if the `href` attribute is present</td>
  </tr>
    <tr>
      <td>Can display `:focus`, `:hover`, `:active`, and `:disabled`</td>
      <td>Can display `:link`, `:visited`, `:focus`, `:hover`, and `:active`</td>      
    </tr>
    <tr>
    <tr>
      <td>Click with the space bar</td>
      <td>Click with the Enter button</td>
     </tr>
    <tr>
      <td>
       Can be `disabled`
      </td>
      <td>Can be made unusable with `tabindex='-1' and `aria-hidden='true'`</td>
    </tr>
  </tbody>  
</table>


## Accessibility/Design Considerations 
 - If something is words in a box ('looks like' a button), will it open a new window? Should it be triggered with the space key or enter key? Users should be able to tell without having to try both and find out.
  - Marcy Sutton suggests pushing back on designs that involve making something that is semantically a link look like a button. I'm not sure yet if it's a big enough accessibility issue to merit the massive changes this would make to the design of certain sites like the one I'm working on.
 - Screenreader users should hear that something is a link if it will take them to a new page, so they know what will happen if they choose to click it.
 - "If a screen reader user calls tech support and gets instructions to "click the button" in your UI that's really coded as a link, they may have trouble finding it." (Marcy Sutton)
 - "Also consider voice interfaces: if you say a command to click a button but it's really coded as a link, you might have problems, no?" (Marcy Sutton)
