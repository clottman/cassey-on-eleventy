const MarkdownIt = require("markdown-it");

/* Markdown Plugins */
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const markdownItEleventyImgOpts = {
  imgOptions: {
    outputDir: '_site/img/'
  }
};
const markdownItAnchor = require("markdown-it-anchor");
const markDownItAnchorOpts = {
  permalink: true,
  permalinkClass: "direct-link",
  permalinkSymbol: "#",
  permalinkBefore: true,
};

const options = {
  html: true,
  breaks: true,
  linkify: true,
};


// eleventyConfig.amendLibrary('md', mdLib => mdLib.use(markdownEleventyImg, {
//     imgOptions: {
//         widths: [368, 736, 900],
//         formats: ['avif', 'webp', 'auto'],
//         urlPath: '/assets/images/scaled',
//         outputDir: '_site/assets/images/scaled'
//     },
//     globalAttributes: {
//         sizes: '100vw',
//         loading: 'lazy',
//         decoding: 'async'
//     },
//     resolvePath: (filepath, env) => {
//         let isPostImage = filepath.startsWith('./');
//         if (isPostImage) {
//             // Resolve path to post-relative images
//             return path.join(path.dirname(env.page.inputPath), filepath);
//         } else {
//             // Resolve path to global images
//             return path.join('_site', filepath);
//         }
//     }
// }));
module.exports = MarkdownIt(options).use(
  markdownItAnchor,
  markDownItAnchorOpts
).use(markdownItEleventyImg, markdownItEleventyImgOpts)
.use(require('markdown-it-footnote'));
