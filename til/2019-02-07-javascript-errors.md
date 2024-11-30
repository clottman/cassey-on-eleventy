---
tilTags: ['devtools', 'javascript']
title: How Error Handling Works in Browsers
date: 2019-02-07
---

I watched this video ([Everything is broken, and I don't know why](https://www.youtube.com/watch?v=e4eE5VeO1_o)) over lunch. I learned a bit about how browsers handle unhandled exceptions. Mostly it gave me empathy for why Sentry doesn't always have a super helpful stack trace - browsers give stack traces as strings, and every browser uses a different format. The format also changes between versions of the same browser.