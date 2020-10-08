---
tags: ['post', 'react', 'styled-components']
title: 'Learning about styled components'
date: 2019-09-25
---

There's a new library of React components that are shared across the organization at my job, and it uses [Styled Components](https://www.styled-components.com/) which I don't know much about. 

I know that styled components use JavaScript template literals to define the CSS for an element right in line with the element tag. 

From the Styled Components docs: 
```
// define a component
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App = () => (
  // then use it in your regular React component
  <Title />
);
```

That's mostly what I knew about styled components at the beginning of the day. 

Then I [read some docs](https://www.styled-components.com/docs/basics) and now I know a bunch more!

Things I learned today: 
 - It's important to define the styled components outside the React component where they are used, so they don't get created each time the component renders.
 - CSS defined in styled components are automatically vendor-prefixed.
 - Every styled component has an `as` prop that changes what the base element of the component is. 
   - I'd been using the `as` prop when using components exported from the shared component library at work, but didn't realize it was something I could do on all components and not just, say, the `<Button>` component. 
- The styled component will accept any other props that the underlying element usually accepts, and passes them through to the underlying element. 
  - I had been wondering how to know which props were available on shared components like `<Button>` - but turns out it's everything available on the base element!
 - You can also define other props that your component will accept, that perhaps change the styles on the base element.

```
// from https://www.styled-components.com/docs/basics#passed-props
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  `
  
const Input = styled.input.attrs(props => ({
    // we can define static props
    type: "password",
    // or we can define dynamic ones
    size: props.size || "1em",
  }))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;
```