const imgUrlShortcode = require('../imageHelpers').imgUrlShortcode;

module.exports = async function () {

  let social_image = await imgUrlShortcode("raw_img/down-arrow.png", [256]);
  social_image = 'https://cassey.dev' + social_image;

  return {
      social_image,
      social_image_alt: "a curved arrow pointing down",
      twitter_card_style: "summary"
    };
};
