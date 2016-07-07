/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify");

var Q = require('q');
var changed = require('gulp-changed');

var browserSync = require('browser-sync');
var reload = browserSync.reload;


var paths = {
  webroot: ""
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/build/site.min.js";
paths.concatCssDest = paths.webroot + "css/build/site.min.css";


gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);


gulp.task("test3", function () {

return gulp.src('client/js/**/*.js') // Matches 'client/js/somedir/somefile.js' and resolves `base` to `client/js/`
  //.pipe(minify())
  .pipe(gulp.dest('build'));  // Writes 'build/somedir/somefile.js'
});

gulp.task("test2", function () {
    return gulp.src('client/js/**/*.js', { base: 'client' })
                //.pipe(minify())
              .pipe(gulp.dest('build'));  // Writes 'build/js/somedir/somefile.js'
});


gulp.task('watch', function() {
  gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
});

// watch files for changes and reload
gulp.task('serve',["clean", "min"], function() {
  browserSync({
    server: {
      baseDir: './'//app'
    }
  });

  //gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: '.'}, reload);
//gulp.watch('css/**/*.css', ["min"]).on('change', browserSync.reload); // Working
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], ["min"]).on('change', browserSync.reload);
});

gulp.task('serve2', ["clean", "min"], function () {
  var config = {
    server: {
      baseDir: '.'
    },
    startPath: '/index.html'
  };

  browserSync.init([
    'js/build/site.min.js',
    'css/build/site.min.css',
    '*.html'
  ], config);

  gulp.watch('css/**/*.css', ['min:css']);
  gulp.watch('js/**/*.js', ['min:js']);
  //gulp.watch('./src/partials/partial.erb.html', ['html']);
  //gulp.watch('./demo/base.erb.html', ['html']);
});



gulp.task("default", ["clean", "min"]);