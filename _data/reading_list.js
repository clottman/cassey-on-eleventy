const Airtable = require('airtable');
const { AssetCache } = require("@11ty/eleventy-fetch");

const createBookFromRecord = (record) => ({
    name: record.get('Name'),
    author: record.get('Author')
  });

module.exports = async function() {
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BOOKS_BASE_ID);
  const books = {
    current: [],
  };
  const asset = new AssetCache("airtable_books_read");

  if(asset.isCacheValid("1h")) {
    // return cached data.
    return asset.getCachedValue();
  }

  try {
    await base("My Library").select({
      filterByFormula: "{read or in progress}"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      try {
        records?.forEach(function(record) {
          const yearsRead = record.get("I finished reading it")
          yearsRead?.forEach(year => {
            books[year] = books[year] || [];
            books[year].push(createBookFromRecord(record));
          });
  
          if (record.get("Started") && !record.get("I finished reading it")) {
            books.current.push(createBookFromRecord(record));
          }
        });
      } catch (error) {
        console.log(error);
      }
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    });
    console.log("saving");
    await asset.save(books, "json");
    return books;
  } catch (err) {
    console.log(err);
    console.log("returning cached");
    return asset.getCachedValue();
  }
};
