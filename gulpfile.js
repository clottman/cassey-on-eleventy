const gulp = require("gulp");
const sass = require("gulp-sass");

// a task to generate the css with sass
exports.default = function() {
  return gulp.src('./_sass/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
};

