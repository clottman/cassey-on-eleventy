const Image = require("@11ty/eleventy-img");
const imgUrlShortcode = require("../../imageHelpers").imgUrlShortcode;

async function imageShortcode(src, alt, sizes, extraImgClasses) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
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
    outputDir: "./_site/img/",
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];

  return `<img class="${classes}" src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

// gets the full url path for use in ie social preview images
async function imgFullUrl (src, width = 1600) {
  site = process.env.CONTEXT === "deploy-preview"
      ? process.env.DEPLOY_PRIME_URL
      : process.env.URL;

  let social_image = await imgUrlShortcode(
    src,
    [width],
    ["png"]
  );
  return site + social_image;
}

module.exports = {
  imageShortcode,
  imgShortcode,
  imgFullUrl
};
