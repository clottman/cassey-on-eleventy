// from: https://www.webstoemp.com/blog/basic-custom-taxonomies-with-eleventy/ 

const lodash = require("lodash");

/**
 * Select all objects in an array
 * where the path includes the value to match
 * capitalisation and diacritics are removed from compared values
 *
 * @param {Array} arr - array of objects to inspect
 * @param {String} path - path to inspect for each object
 * @param {String} value - value to match
 * @return {Array} - new array
 */

module.exports = function (arr, path, value) {
  value = lodash.deburr(value).toLowerCase();
  const filtered = arr.filter((item) => {
    let pathValue = lodash.get(item, path);
    pathValue = lodash.deburr(pathValue).toLowerCase();
    return pathValue.includes(value);
  });
  return filtered;
};