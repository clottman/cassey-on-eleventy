const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const buildCss = require("./config/buildCss");
const markdown = require("./config/markdown");
require("dotenv").config();

const {
  tilCollection,
  rssCollection,
  tilTagsCollection,
  sortedNavCollection,
} = require("./config/collections");

const {
  stripPs,
  classifyTagFilter,
  readableDateFilter,
  htmlDateStringFilter,
  headFilter,
  markdownifyFilter,
} = require("./config/filters");
const includeFilter = require("./config/filters/include.js");
const { imgShortcode, imageShortcode, imgFullUrl } = require("./config/shortcodes/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(eleventyAutoCacheBuster);
  
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  eleventyConfig.addFilter("markdownify", markdownifyFilter);
  eleventyConfig.addFilter("stripPs", stripPs);
  eleventyConfig.addFilter("readableDate", readableDateFilter);
  eleventyConfig.addFilter("include", includeFilter);

  // for use with the log filter when you want to dump an object to string on the page
  eleventyConfig.addFilter("stringifyObject", (obj) => {
    return JSON.stringify(obj);
  });

  // replaces whitespace with _ and removes slashes
  eleventyConfig.addFilter("classifyTag", classifyTagFilter);

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", htmlDateStringFilter);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", headFilter);

  ["img", "css", "files", "admin"].forEach((path) =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.addCollection("sortedNav", sortedNavCollection);
  eleventyConfig.addCollection("tagList", require("./config/getTagList"));
  eleventyConfig.addCollection("til", tilCollection);
  eleventyConfig.addCollection("rss", rssCollection);
  eleventyConfig.addCollection("tilTags", tilTagsCollection);

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("img", imgShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imgFullUrl", imgFullUrl);

  // compile sass and optimize it https://www.d-hagemeier.com/en/articles/sass-compile-11ty/
  eleventyConfig.on("beforeBuild", buildCss);

  // trigger a rebuild if sass changes
  eleventyConfig.addWatchTarget("_sass/");

  return {
    templateFormats: ["md", "njk", "html", "liquid", "hbs"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "./",
      includes: "./_includes",
      data: "./_data",
      output: "./_site",
    },
  };
};
