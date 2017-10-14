var gulp            = require('gulp'),
    clean           = require('gulp-clean'),
    clone           = require('gulp-clone'),
    connect         = require('gulp-connect'),
    foreach         = require('gulp-foreach'),
    data            = require('gulp-data'),
    jsonFormat      = require('gulp-json-format');
    livingcss       = require('gulp-livingcss'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    sequence        = require('run-sequence'),
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
    .pipe(jsonFormat(2))
    .pipe(gulp.dest('public/styleguide/data'));
});

gulp.task('nunjucks', function () {
  return gulp.src('public/styleguide/data/*.json')
    .pipe(foreach(function(stream, file) {

      var json_file = path.relative(file.cwd, file.path);
      var json_data = fs.readFileSync(json_file,'utf8');

      console.log("processing file " + json_file);


      console.log(file.relative);

      stream.pipe(clone())
        .pipe(data({
            testing: 'stuff'
        }))
        .pipe(nunjucksRender(options.nunjucks))
        .pipe(rename(file.relative + '.html'))
        .pipe(gulp.dest('public/styleguide/'));

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
