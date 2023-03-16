const MarkdownIt = require("markdown-it");

/* Markdown Plugins */
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

module.exports = MarkdownIt(options).use(
  markdownItAnchor,
  markDownItAnchorOpts
);
