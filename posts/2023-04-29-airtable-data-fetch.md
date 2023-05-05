
I've been seeing a lot of people blog about setting up a [now page](https://nownownow.com/about) on their website. Kind of like an about page, a now page is a page on a personal website that tells you what that person is up to in their life. Some people blog on that page, while others use APIs from services that track their media consumption or daily habits to fill the page with interesting little snippets of what's going on in their life.

Some examples of other Eleventy now pages include [Cory Dransfeldt's](https://coryd.dev/posts/2023/building-my-now-page-using-eleventy/) and [Flamed Fury's](https://flamedfury.com/posts/building-and-automating-my-now-page/) pages.

I'm interested in the API-driven approach, but I don't use any of the services that I've seen others use, like Trakt, Letterboxd, omg.lol, or Last.fm. The one place I _do_ currently track media I've consumed is Airtable! Airtable is like a cross between spreadsheet software and a relational database with a really pretty GUI to access it through. I store lots of things in Airtable, but most importantly for today, I track the books I want to read but haven't yet, and mark them as read as I read them. 

In past years, when I go to make my end of year books post for my site, I meticulously copy over the titles and authors that I've stored in my Airtable, and fill in the details in a JSON file for my site. It takes a long time. A nice side effect of this project to show my currently read book is that this year, I'll be able to speed that copy-by-hand process up and output a JSON file of the books tagged as finished this year, saving me a lot of typing. 


## Tools and Docs 
There are two tools that are going to be really helpful for this project: [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/), and the Airtable.js JavaScript library. Check out the [docs for the Airtable API](https://airtable.com/developers/web/api/introduction). Note: they're kind of hard to get to, but you'll especially want to open up the interactive docs for Airtable.js. On that API introduction page, you'll make sure you're logged in, then scroll down below the list of libraries to the list under "To view API documentation that is generated for a particular base" and click the name of the base that holds whatever you want to import into Eleventy.

## Authenticating with Airtable
You'll need a personal access token for Airtable - see [personal access token instructions](https://airtable.com/developers/web/guides/personal-access-tokens) here. 

You'll want to keep that value safe and private, aka out of your front-end code and out of your git history. I put it in an .env file, making sure my .env is gitignored, and also in the secure environment variables section of my host (Netlify, in my case).



First we're going to install Eleventy Fetch. 
`npm install @11ty/eleventy-fetch`

I read the important security & privacy notice and next added `.cache` to my `.gitignore`. 

`npm install airtable`

