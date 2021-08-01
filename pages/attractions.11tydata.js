const imgUrlShortcode = require('../imageHelpers').imgUrlShortcode;

module.exports = async function () {

  let social_image = await imgUrlShortcode("raw_img/attractions/cassey_toilets.jpg");
  social_image = 'https://cassey.dev' + social_image;

  return {
      social_image,
      social_image_alt: "Cassey, with long blonde hair, stands in a grassy lot next to 3 toilets painted red, white, and blue respectively. In the background is a semi-circle of more old toilets, a mailbox, a sign that says 'MEN WORKING', and a life-size rusty metal yeti figure."
    };
};
