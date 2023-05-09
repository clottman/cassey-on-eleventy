---
layout: post
title: "Fetching & caching data from Airtable in my 11ty site"
date: 2023-05-09
tags: [posts, code, eleventy]
social_description: "Using the Airtable.js library and Eleventy Fetch"
---

I've been seeing a lot of people blog about setting up a [now page](https://nownownow.com/about) on their website. Kind of like an about page, a now page is a page on a personal website that tells you what that person is up to in their life. Some people blog on that page, while others use APIs from services that track their media consumption or daily habits to fill the page with interesting little snippets of what's going on in their life.

Some examples of other Eleventy now pages include [Cory Dransfeldt's](https://coryd.dev/posts/2023/building-my-now-page-using-eleventy/) and [Flamed Fury's](https://flamedfury.com/posts/building-and-automating-my-now-page/) pages.

I'm interested in the API-driven approach, but I don't use any of the services that I've seen others use, like Trakt, Letterboxd, omg.lol, or Last.fm. The one place I _do_ currently track media I've consumed is Airtable! Airtable is like a cross between spreadsheet software and a relational database with a really pretty GUI to access it through. I store lots of things in Airtable, but most importantly for today, I track the books I want to read but haven't yet, and mark them as read as I read them. 

In past years, when I go to make my end of year books post for my site, I meticulously copy over the titles and authors that I've stored in my Airtable, and fill in the details in a JSON file for my site. It takes a long time. A nice side effect of this project to show my currently read book is that this year, I'll be able to speed that copy-by-hand process up and output a JSON file of the books tagged as finished this year, saving me a lot of typing. 


## Tools and Docs 
There are two tools that are going to be really helpful for this project: [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/), and the Airtable.js JavaScript library. Check out the [docs for the Airtable API](https://airtable.com/developers/web/api/introduction). Note: they're kind of hard to get to, but you'll especially want to open up the interactive docs for Airtable.js. On that API introduction page, you'll make sure you're logged in, then scroll down below the list of libraries to the list under "To view API documentation that is generated for a particular base" and click the name of the base that holds whatever you want to import into Eleventy.

## Authenticating with Airtable
You'll need a personal access token for Airtable - see [personal access token instructions](https://airtable.com/developers/web/guides/personal-access-tokens) here. 

You'll want to keep that value safe and private, aka out of your front-end code and out of your git history. I put it in an [.env file](https://www.11ty.dev/docs/environment-vars/#via-.env-file) and also in the secure environment variables section of my host (Netlify, in my case). 

If you are creating a `.env` file for the first time, take these steps: 
1. Make sure to install `dotenv` with `npm install dotenv --save`
2. Add `require('dotenv').config()` at the top of your .eleventy.js config file. 
3. Add `.env` to your `.gitignore`, creating a file with the name `.gitignore` if needed. The gigitnore file should be committed, but `.env` is for your secrets and should _never_ be committed to your git repository. 

Setting up dotenv means you can access variables in your `.env` in your Eleventy code using `process.env.MY_VARIABLE_NAME` (all caps for environment variable names is a convention).

## Airtable Table ID
Airtable refers to its tables as "bases". But the docs refers to bases as tables! In the interactive docs (see above docs section), find the header on the left that says "[YOUR TABLE NAME] TABLE". In that section, you'll see "The id for [your table name] is [blah blah blah]." You can hardcode that value into your code, but I put mine in my .env file for safe-keeping. You can also use the base name in your code instead, but the id won't change even if you change the base name in Airtable. 

## Setting Up Dependencies

First we're going to install Eleventy Fetch and the Airtable.js library. 

```bash
npm install @11ty/eleventy-fetch
npm install airtable
```

I read the [important security & privacy notice on the Eleventy Fetch docs](https://www.11ty.dev/docs/plugins/fetch/#installation) and next added `.cache` to my `.gitignore`. 

## Importing my reading list as Eleventy Data

Create a new file under `_data` and give it a `.js` extension. The data exported from this file we'll be available to your template files using the name of the file (minus the `.js`). We'll use Eleventy Fetch to cache the data, so even if a subsequent request fails because the Airtable API is down, we'll be able to build the site anyways using the last cached value. It will also help with limiting our requests to Airtable when you're working on your site - unless you're working on this feature, you probably don't want to hit the Airtable API every single time your site rebuilds as you're working on something else!

The Airtable base I'm using is a list of books with at least these fields: 
 - "Name" - text
 - "Author" - text
 - "Started" - single select, containing the current year or nothing. This could easily also be a checkbox!
 - "Finished Reading" - a multi-select (maybe I read it multiple times), containing zero or more years
 - "read?" - a formula field that checks if "Finished Reading" has any values. The formula is `NOT({Finished Reading}=BLANK())`
 - "read or in progress" - a formula field that results in a 0 or 1 for if the book should go to my Eleventy site at all - I want to exclude the books that I am interested in but haven't started or finished yet. The formula here is `OR({read?},{Started})`. 

The data I want to get for my reading list in my 11ty site is a JSON object with a key for "current" (books I'm currently reading) and a key for each year for books I've marked as finished. The value of each key in the returned object will be an array of objects representing books, with a name and author stored for now. 

I keep books I've read and books I want to read in the same Airtable base, so I'm filtering the records I ask for from Airtable to just the ones that are already read or are in progress. That's the `filterByFormula` value in my code below. Note that the `read or in progress` field is what I'm using to filter my response from Airtable in the code down below, and I could easily put that formula directly in my code as the `filterByFormula` instead of as a column in Airtable. But, it's easier to test that your formulas work by adjusting columns in Airtable first and seeing the response dynamically rather than with every build. 

An interesting thing about the Airtable API is that it assumes that you might have lots of data, and thus need to get the data back one page (segment of records) at a time. The Airtable docs for fetching a list of records using recursive callbacks to get each page of records, and call a `done` function you provide when finished. I converted the code to an async/await style so that it would fit better with the control flow of my async export for the data file. 

## Saving cached records

Eleventy Fetch is usually used by providing the Fetch library a URL, and the results returned by calling that URL are what's cached. Here, we want to do things a little differently- in part because we're transforming the data we get back, and that's what we want to save rather than the Airtable raw results, but mainly because the records are paginated, and not returned all at once. If you have less than 100 records (and know that will always be the case), you could use 11ty Fetch the traditional way. Instead, we'll be [manually storing our data in the cache](https://www.11ty.dev/docs/plugins/fetch/#manually-store-your-own-data-in-the-cache), which is officially supported, but is listed in the docs as an Advanced use case that most people won't need. We have a good reason though so it's okay. 😊


### A note on debugging
If you're not sure your cache is working, you might try running Eleventy in debug mode. Woe! You might then say. There's nothing related to caching in the debug output! This actually isn't a sign that something is wrong - as of writing (May 8, 2023), the code I'm using here isn't actually going to show any debug output. I [opened an issue](https://github.com/11ty/eleventy-fetch/issues/31) hoping for more debug output, but in the mean time, look in that `.cache` folder generated by Eleventy and see if your data is showing up there or not. 

While debugging your Airtable field names and formulas (if you're using any), you'll probably want to refresh your data on every run. Make sure to comment out these lines or change the duration (the argument to `isCacheValid`) to `0s`: 

```javascript
if(asset.isCacheValid("1d")) {
  return asset.getCachedValue();
}
  ```

## Okay show me the code

Here's the code I'm using: 

```javascript
const Airtable = require('airtable');
const { AssetCache } = require("@11ty/eleventy-fetch");

// takes an airtable record and returns a javascript object with the fields I want
const createBookFromRecord = (record) => ({
    name: record.get('Name'),
    author: record.get('Author')
  });

module.exports = async function() {
  // create a connection to your airtable base
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BOOKS_BASE_ID);

  // set up an object we'll populate with data.
  const books = {
    current: [],
  };

  // any unique-to-our-app key will work as the argument to the AssetCache constructor
  const asset = new AssetCache("airtable_books_read");
  
  // check if the cache is fresh within the last day
  if(asset.isCacheValid("1d")) {
    // return cached data.
    return asset.getCachedValue();
  }

  try {
    await base(process.env.AIRTABLE_BOOKS_BASE_ID).select({
      // https://support.airtable.com/docs/formula-field-reference
      filterByFormula: "{read or in progress}"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      try {
        // sometimes a page comes back with no records, hence the optional chaining (?) operator
        records?.forEach(function(record) {
          // "Finished Reading" is a multi-select field containing zero or more years
          const yearsRead = record.get("Finished Reading")
          yearsRead?.forEach(year => {
            books[year] = books[year] || [];
            books[year].push(createBookFromRecord(record));
          });
  
          if (record.get("Started") && !record.get("Finished Reading")) {
            books.current.push(createBookFromRecord(record));
          }
        });
      } catch (error) {
        console.log(error);
      }
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, the promise will resolve.
        fetchNextPage();
    });
    console.log("saving");
    await asset.save(books, "json");
    return books;
  } catch (err) {
    console.log(err);
    console.log("returning cached");
    return asset.getCachedValue();
  }
};
```

## Displaying the Data

I'm using some Nunjucks code like this to display my in-progress books on my [about page](/about) for right now. I'm using the Nunjucks length filter to check if there are any books I'm currently reading.

```html
{% raw %}{% if reading_list.current|length %}
  <ul>
    {% for book in reading_list.current %}
      <li>{{ book["name"]}} {% if book.author %}by {% endif %} {{book.author}}
    {% endfor %}
  </ul>
{% endif %}

{% if not reading_list.current|length %}
  Nothing! Check back soon to see what I've started.
{% endif %}
{% endraw %}
```

## Great but I don't commit to my site every day

Static sites like Eleventy only update at build time. And if you're not pushing code or new blog posts as frequently as you're updating your book list in Airtable, your reading list might get stale! We'll set up a GitHub action to run  every day and tell Netlify to build our site. I've been putting off any changes that would require me to have to do this for a long time, but it's really not that much work to set up. I followed [this blog on setting up a Github Action for triggering Netlify builds](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/).


