var gulp            = require('gulp'),
    clean           = require('gulp-clean'),
    clone           = require('gulp-clone'),
    connect         = require('gulp-connect'),
    foreach         = require('gulp-foreach'),
    data            = require('gulp-data'),
    jsonFormat      = require('gulp-json-format');
    livingcss       = require('gulp-livingcss'),
    mergeJSON       = require('gulp-merge-json'),
    rename          = require('gulp-rename'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    sass            = require('gulp-sass'),
    sequence        = require('run-sequence'),
    importFresh     = require('import-fresh'),
    readFiles       = require('read-vinyl-file-stream');
    path            = require('path'),
    fs              = require('fs');


const options = require('./src/styleguide/options');

gulp.task('clean', function () {
  return gulp.src('public', {read: false})
    .pipe(clean());
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      includePaths: 'node_modules/bootstrap/',
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('styleguide', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(livingcss('',options.livingcss))
    .pipe(mergeJSON(options.mergeJSON))
    .pipe(jsonFormat(2))
    .pipe(gulp.dest('public/styleguide/data'));
});

gulp.task('nunjucks', function () {

  let cssData = importFresh('./public/styleguide/data/css.json');

  return gulp.src('src/styleguide/templates/layout.html')
    .pipe(foreach(function(stream, file){
      console.log(file.relative);
      console.log('process one');
      // loop through all the json array, each one represents a unique scenario
      // so we want a new file for each

      for ( var ii = 0; ii < cssData.allSections.length; ii++) {

        let this_data = cssData.allSections[ii];
        console.log(this_data);

        stream.pipe(clone())
          .pipe(data(this_data))
          .pipe(nunjucksRender(options.nunjucks))
          .pipe(rename(this_data.id + '.html'))
          .pipe(gulp.dest('public/styleguide'));
      }

      return stream;
    }));
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass','styleguide','nunjucks']);
});


gulp.task('default', function() {
  sequence('clean',
           'sass',
           'styleguide',
           'nunjucks',
           'connect',
           'watch');
});
