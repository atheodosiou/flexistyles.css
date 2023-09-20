const { src, dest, watch, series, parallel } = require("gulp"); // Import 'parallel'
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const fs = require("fs");
const path = require("path");

function clean() {
  // Define the path to the 'css' folder
  const cssFolderPath = path.join(__dirname, "css");

  // Check if the 'css' folder exists
  if (fs.existsSync(cssFolderPath)) {
    // Use the 'fs' module to remove the 'css' folder and its contents
    fs.rmSync(cssFolderPath, { recursive: true });
  }

  return Promise.resolve(); // Return a resolved Promise to signal task completion
}

function buildStyles() {
  return src("flexistyles/flexistyles.scss")
    .pipe(sass())
    .pipe(dest("css"))
    .pipe(cssnano()) // Minify immediately after building
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("css"));
}

function watchTask() {
  watch(["flexistyles/**/*.scss"], buildStyles);
}

exports.default = series(clean, buildStyles, watchTask); // Use 'parallel'
