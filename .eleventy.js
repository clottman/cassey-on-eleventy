const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs-extra");
const path = require("path");
const getTagList = require("./_11ty/getTagList");
const MarkdownIt = require("markdown-it");
const lodash = require("lodash");
const slugify = require("slugify");
const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const Image = require("@11ty/eleventy-img");

/**
 * Get all unique key values from a collection
 *
 * @param {Array} collectionArray - collection to loop through
 * @param {String} key - key to get values from
 * https://www.webstoemp.com/blog/basic-custom-taxonomies-with-eleventy/
 */
function getAllKeyValues(collectionArray, key) {
  // get all values from collection
  let allValues = collectionArray.map((item) => {
    let values = item.data[key] ? item.data[key] : [];
    return values;
  });

  // flatten values array
  allValues = lodash.flattenDeep(allValues);
  // to lowercase
  allValues = allValues.map((item) => item.toLowerCase());
  // remove duplicates
  allValues = [...new Set(allValues)];
  // order alphabetically
  allValues = allValues.sort(function (a, b) {
    return a.localeCompare(b, "en", { sensitivity: "base" });
  });
  // return
  return allValues;
}

/**
 * Transform a string into a slug
 * Uses slugify package
 *
 * @param {String} str - string to slugify
 * https://www.webstoemp.com/blog/basic-custom-taxonomies-with-eleventy/
 */
function strToSlug(str) {
  const options = {
    replacement: "-",
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true,
  };

  return slugify(str, options);
}

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
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [width],
    formats: ["jpeg"]
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  console.log(data);
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

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addJavaScriptFunction("getTagList", getTagList);

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

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

  eleventyConfig.addCollection("sortedNav", (collection) =>
    collection
      .getAllSorted()
      .filter((item) => item.data.navtitle)
      .sort(function (a, b) {
        if (a.data.navorder < b.data.navorder) return -1;
        else if (a.data.navorder > b.data.navorder) return 1;
        else return 0;
      })
  );
  const tilGlob = "til/*.*";
  eleventyConfig.addCollection("til", function (collectionApi) {
    return collectionApi.getFilteredByGlob(tilGlob);
  });

  // create til-tags collection
  eleventyConfig.addCollection("tilTags", function (collection) {
    let allTilTags = getAllKeyValues(
      collection.getFilteredByGlob(tilGlob),
      "til-tags"
    );

    let tilTags = allTilTags.map((tilTag) => strToSlug(tilTag));
    return tilTags;
  });

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
