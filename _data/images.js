const groq = require("groq");
const client = require("../utils/sanityClient.js");
const imageUrl = require("@sanity/image-url");

function generateImageData({ blogImage, date, slug }) {
  return {
    image: `![${blogImage.alt}](${imageUrl(client)
      .image(blogImage)
      .width(300)
      .url()})`,
    caption: blogImage.caption,
    date,
    slug,
  };
}

async function getImages() {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  if (!client) {
    return [];
  }

  const filter = groq`*[_type == "imageHolder"]`;
  const projection = groq`{
    blogImage,
    date,
    slug
  }`;
  const order = `| order(date desc)`;
  const query = [filter, projection, order].join(" ");
  const docs = await client.fetch(query).catch((err) => console.error(err));
  const preparePosts = docs.map(generateImageData);
  return preparePosts;
}

module.exports = getImages;
