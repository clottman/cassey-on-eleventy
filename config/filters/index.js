const { DateTime } = require("luxon");
const MarkdownIt = require("markdown-it");

const stripPs = (value) => {
  const firstPass = value.replace("<p>", "");
  return firstPass.replace("</p>", "");
}

// replaces whitespace with _ and removes slashes
const classifyTagFilter = (str) => {
  const noSpaces = str.replace(" ", "_");
  return noSpaces.replace("/", "_");
}

const readableDateFilter = (dateObj) => {
  const dateFormat = "dd LLL yyyy";
  const dateToUse = dateObj instanceof Date ? dateObj : new Date(dateObj);
  return DateTime.fromJSDate(dateToUse, { zone: "utc" }).toFormat(dateFormat);
}

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
const htmlDateStringFilter = (dateObj) => {
  return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
}

// Get the first `n` elements of a collection.
const headFilter = (array, n) => {
  if (n < 0) {
    return array.slice(n);
  }
  return array.slice(0, n);
}

const md = new MarkdownIt();
const markdownifyFilter = (value) => {
  return md.render(value);
}

module.exports = {
  stripPs,
  classifyTagFilter,
  readableDateFilter,
  htmlDateStringFilter,
  headFilter,
  markdownifyFilter,
}
