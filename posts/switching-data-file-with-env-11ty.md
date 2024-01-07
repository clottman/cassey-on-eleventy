---
layout: post
tags: ["posts", "eleventy", "code"]
title: "Dynamically choosing a data file to use in Eleventy templates"
description: "What if I need _data/stuff.json sometimes and _data/thing.json other times?"
date: 2021-11-17
redirectsFrom: "/posts/2021-11-17-switching-data-file-with-env-11ty/"
---

Today in the [Eleventy Discord](https://www.11ty.dev/blog/discord/), someone came in with a tricky problem. They wanted to set an environment variable to the name of a data file, and then in a Nunjucks template, use the data file that was specified as an environment variable. 

They were stumped on how to make Eleventy read from the data file using the value from the environment variable, instead of just printing the name of the data file. 

Eventually, I helped them solve the problem by adding a custom filter that returns the data from the data file specified as a string argument. ([Data files are processed after the Eleventy config file is finished processing](https://github.com/11ty/eleventy/issues/1231), because the location of global data can be changed in the config. So, we need to use `require` instead of some special Eleventy way of getting to global data, and that also means hard-coding the path to the file.)

Here's the code we needed to make this work: 

In .eleventy.js:
```
eleventyConfig.addFilter('getGlobalData', (data) => {
    // if your global data lives elsewhere, this file path will need to change a bit
    return require(`./src/_data/${data}.json`);
});
```

<hr />
<br />

In posts/posts.11tydata.js, a directory data file: 
Make sure to install the dotenv package if you don't have it yet
```
require('dotenv').config();

module.exports = {
  eleventyComputed: {
      dataFileName: data => process.env.dataFileName,
  }
};
```

<hr />
<br />

In _data/customName.json:
```
{
  "hello": "hi"
}
```

<hr />
<br />

In .env:

```
dataFileName=customName
```

<hr />
<br />
In posts/hello.njk
{% raw %}
```
{% for k, v in dataFileName | getGlobalData %}
   {{ k }} {{ v }}
{% endfor %}
```
{% endraw %}

<hr />
<br />

With all these pieces together, when we go to the page at our site at `/posts/hello`, we should see "hello hi" on the page.

We could change the value of `dataFileName` in `.env` and add another data file whose name matches the value we set, and that would give us a different result. Neat!

