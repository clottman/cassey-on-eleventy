const imgUrlShortcode = require('../imageHelpers').imgUrlShortcode;

module.exports = async function() {
  site = process.env.CONTEXT === 'deploy-preview' ? process.env.DEPLOY_PRIME_URL : process.env.URL;

  let social_image = await imgUrlShortcode("raw_img/cassey-dev.png", [1600], ["png"]);
  social_image = site + social_image;

  return {
  "title": "Cassey Lottman",
  "url": "https://cassey.dev/",
  "description": "Cassey is a software developer who likes building for the Web most of all. She [ran for City Council](http://casseyforcouncil.com) in Lincoln, Nebraska in 2019 and, according to Councilman Bennie Shobe, \"is not going to go away.\"",
  "social_description": "One person is typing.",
  "feed": {
    "subtitle": "One person is typing.",
    "filename": "feed.xml",
    "path": "/feed/feed.xml",
    "url": "https://cassey.dev/feed/feed.xml",
    "id": "https://cassey.dev/"
  },
  "author": {
    "name": "Cassey Lottman",
    "site": "https://cassey.dev",
    "github_username": "clottman",
    "glitch_username": "Cassey",
    "twitters": [
      {
        "username": "CasseyLottman",
        "display": "Twitter"
      }
    ],
    "til": "https://cassey.dev/til"
  },
  "favicon": "/img/favicon.ico",
  "social_image": social_image,
  "social_image_alt": "cassey.dev",
  "social_image_height": 900,
  "social_image_width": 1600
}
}