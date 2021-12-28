const books = require("./books_2021");

// makes a list of all the unique tags on books from the 2021 book list

const bookTags = books.map((book) => book.tags);
const tagSet = new Set();

for (const tagList of bookTags) {
    for (const tag of tagList) {
        tagSet.add(tag);
    }
}
module.exports = Array.from(tagSet);