const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const fs = require("fs-extra");

// compile sass and optimize it https://www.d-hagemeier.com/en/articles/sass-compile-11ty/
module.exports = () => {
  let result = sass.renderSync({
    file: "_sass/main.scss",
    sourceMap: false,
    outputStyle: "compressed",
  });
  console.log("SCSS compiled");

  // Optimize and write file with PostCSS
  let css = result.css.toString();
  postcss([autoprefixer])
    .process(css, { from: "main.css", to: "css/main.css" })
    .then((result) => {
      fs.outputFile("_site/css/main.css", result.css, (err) => {
        if (err) throw err;
        console.log("CSS optimized");
      });
    });
};
