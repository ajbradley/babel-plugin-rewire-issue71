var gulp = require('gulp');
var babel = require("gulp-babel");

var sourcemaps = require("gulp-sourcemaps");


gulp.task("build", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    ;
});

gulp.task("default", ['build']);
