const Image = require("@11ty/eleventy-img");

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

module.exports = {
  imageShortcode,
  imgShortcode
}
