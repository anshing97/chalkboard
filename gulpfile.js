var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    connect     = require('gulp-connect'),
    sass        = require('gulp-sass'),
    kss         = require('kss'),
    sequence    = require('run-sequence');

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


gulp.task('kss-sass', function() {
  return gulp.src('src/styleguide/builder/kss-assets/kss.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css/custom/'));
});


gulp.task('styleguide', function() {

  var options = {
    source: [
      'src/scss/',
    ],
    destination: 'public/styelguide/',

    // just a custome builder
    builder: 'src/styleguide/builder/',
    custom: [
      'Colors',
      'Icons',
      'Content',
    ],
    extend: [
      'src/styleguide/helpers/'
    ],

    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
      '../css/whiteboard.css',
      '../css/custom/kss.css'
    ],
    js: [
    ],

    homepage: '../../src/styleguide/whiteboard.md',
    title: 'Whiteboard'
  };

  return kss(options);
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass','styleguide']);
  gulp.watch('src/scss/**/*.html', ['styleguide']);
  gulp.watch('src/styleguide/**/*.hbs',['styleguide']);
  gulp.watch('src/styleguide/**/*.scss', ['kss-sass']);
});




gulp.task('default', function() {
  sequence('clean',
           'sass',
           'styleguide',
           'kss-sass',
           'connect',
           'watch');
});
