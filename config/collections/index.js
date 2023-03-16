const { getAllKeyValues, strToSlug } = require("./helpers.js");

const tilGlob = "til/*.*";

const tilCollection = (collectionApi) => {
  return collectionApi.getFilteredByGlob(tilGlob);
};

const rssCollection = (collectionApi) => {
  return collectionApi.getFilteredByGlob([tilGlob, "posts/*.*"]);
};

const tilTagsCollection = (collection) => {
  let allTilTags = getAllKeyValues(
    collection.getFilteredByGlob(tilGlob),
    "til-tags"
  );

  let tilTags = allTilTags.map((tilTag) => strToSlug(tilTag));
  return tilTags;
};

const sortedNavCollection = (collection) =>
  collection
    .getAllSorted()
    .filter((item) => item.data.navtitle)
    .sort(function (a, b) {
      if (a.data.navorder < b.data.navorder) return -1;
      else if (a.data.navorder > b.data.navorder) return 1;
      else return 0;
    });

module.exports = {
  tilCollection,
  rssCollection,
  tilTagsCollection,
  sortedNavCollection,
};
