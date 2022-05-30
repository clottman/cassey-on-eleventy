const Image = require("@11ty/eleventy-img");

// get just the output url for an image, for use in social cards
async function imgUrlShortcode(src, widths = [300]) {
    let metadata = await Image(src, {
      widths: widths,
      formats: ["png"],
      outputDir: './_site/img/'
    });
  
    let data = metadata.png[metadata.png.length - 1];
    return data.url;
  }

  module.exports = {
      imgUrlShortcode
    };