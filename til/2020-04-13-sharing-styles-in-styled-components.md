---
til-tags: ["styled-components", "react"]
title: "Sharing Styles in Styled Components"
description: "Using string interpolation"
date: 2020-04-13
---

On Friday, I was working on converting a very complex tooltip component in React from CSS Modules using Stylus to styled-components. 

Some of the styles were used by multiple selectors, like this: 

```
.tooltip.left,
.tooltip.left::before { 
  left: 0;
  right: initial;
  transform: translateX(0);
}
```

At first I thought I wouldn't be able to share those styles in the styled-component version, and would have to write them out twice, like this: 
```
styled.div`
  left: 0;
  right: initial;
  transform: translateX(0);
  &::before {
    left: 0;
    right: initial;
    transform: translateX(0);
  }
`
```

Today I realized the answer lies in the fact that styled components are built on string interpolation. If I want to reuse some styles, I can store them as a string in another variable, and interpolate the variable in the places I want to use the shared styles.

```
const sharedTooltipLeft = `left: 0;
  right: initial;
  transform: translateX(0);
`;

const tooltipLeft = styled.div`
  ${sharedTooltipLeft}
  &::before {
    ${sharedTooltipLeft}
  }
`
```

Do you know a better way to do this? Please let me know!