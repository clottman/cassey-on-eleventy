const Image = require("@11ty/eleventy-img");

// get just the output url for an image, for use in social cards
async function imgUrlShortcode(src) {
    let metadata = await Image(src, {
      widths: [300],
      formats: ["jpeg"],
      outputDir: './_site/img/'
    });
  
    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return data.url;
  }

  module.exports = {
      imgUrlShortcode
    };