const MarkdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
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
} = require("./config/filters");
const includeFilter = require("./config/filters/include.js");
const { imgShortcode, imageShortcode } = require("./config/shortcodes/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  const md = new MarkdownIt();
  eleventyConfig.addFilter("markdownify", (value) => {
    return md.render(value);
  });

  eleventyConfig.addFilter("stripPs", stripPs);
  eleventyConfig.addFilter("readableDate", readableDateFilter);

  // replaces whitespace with _ and removes slashes
  eleventyConfig.addFilter("classifyTag", classifyTagFilter);

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", htmlDateStringFilter);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", headFilter);

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("files");

  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.addCollection("sortedNav", sortedNavCollection);
  eleventyConfig.addCollection("tagList", require("./config/getTagList"));
  eleventyConfig.addCollection("til", tilCollection);
  eleventyConfig.addCollection("rss", rssCollection);
  eleventyConfig.addCollection("tilTags", tilTagsCollection);

  eleventyConfig.addFilter("include", includeFilter);

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("img", imgShortcode);

  // compile sass and optimize it https://www.d-hagemeier.com/en/articles/sass-compile-11ty/
  eleventyConfig.on("beforeBuild", buildCss);

  // trigger a rebuild if sass changes
  eleventyConfig.addWatchTarget("_sass/");

  return {
    templateFormats: ["md", "njk", "html", "liquid", "hbs"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
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
