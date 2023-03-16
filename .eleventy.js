const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs-extra");
const getTagList = require("./config/getTagList");
const MarkdownIt = require("markdown-it");
const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const Image = require("@11ty/eleventy-img");
require('dotenv').config();

const { tilCollection, rssCollection, tilTagsCollection, sortedNavCollection } = require('./config/collections/index.js');

async function imageShortcode(src, alt, sizes, extraImgClasses) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    outputDir: './_site/img/'
  });

  let imageAttributes = {
    alt,
    sizes,
    class: extraImgClasses,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

async function imgShortcode(src, alt, width, classes) {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [width],
    formats: ["jpeg"],
    outputDir: './_site/img/'
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];

  return `<img class="${classes}" src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

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

  eleventyConfig.addFilter("stripPs", (value) => {
    const firstPass = value.replace("<p>", "");
    return firstPass.replace("</p>", "");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const dateFormat = "dd LLL yyyy";
    const dateToUse = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(dateToUse, { zone: "utc" }).toFormat(dateFormat);
  });

  // replaces whitespace with _ and removes slashes
  eleventyConfig.addFilter("classifyTag", (str) => {
    const noSpaces = str.replace(" ", "_");
    return noSpaces.replace("/", "_");
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });


  eleventyConfig.addJavaScriptFunction("getTagList", getTagList);

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("files");

  /* Markdown Plugins */
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let markDownItAnchorOpts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    permalinkBefore: true,
  };

  eleventyConfig.setLibrary(
    "md",
    MarkdownIt(options).use(markdownItAnchor, markDownItAnchorOpts)
  );

  eleventyConfig.addCollection("sortedNav", sortedNavCollection);
  eleventyConfig.addCollection("tagList", require("./config/getTagList"));
  eleventyConfig.addCollection("til", tilCollection);
  eleventyConfig.addCollection("rss", rssCollection);
  eleventyConfig.addCollection("tilTags", tilTagsCollection);

  eleventyConfig.addFilter("include", require("./filters/include.js"));

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("img", imgShortcode);


  // compile sass and optimize it https://www.d-hagemeier.com/en/articles/sass-compile-11ty/ 
  eleventyConfig.on("beforeBuild", () => {
    // Compile Sass
    let result = sass.renderSync({
      file: "_sass/main.scss",
      sourceMap: false,
      outputStyle: "compressed",
    });
    console.log("SCSS compiled");

    // Optimize and write file with PostCSS
    let css = result.css.toString();
    postcss([autoprefixer])
      .process(css, { from: "main.css", to: "css/main.css" })
      .then((result) => {
        fs.outputFile("_site/css/main.css", result.css, (err) => {
          if (err) throw err;
          console.log("CSS optimized");
        });
      });
  });

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
