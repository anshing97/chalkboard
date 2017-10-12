var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    connect     = require('gulp-connect'),
    sass        = require('gulp-sass'),
    livingcss   = require('gulp-livingcss'),
    tap         = require('gulp-tap'),
    sequence    = require('run-sequence'),
    readFiles = require('read-vinyl-file-stream');

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

// gulp.task('styleguide', function () {
//   gulp.src('src/scss/**/*.scss')
//     .pipe(livingcss('',{streamContext:true}))
//     .pipe(readFiles(function (content, file, stream, cb) {

//       styleguide = JSON.parse(content);
//       console.log(JSON.stringify(styleguide,null,4));

//     }))
//     .pipe(gulp.dest('public/styleguide'))
// });

gulp.task('styleguide', function () {
  gulp.src('public/css/whiteboard.css')
    .pipe(livingcss())
    .pipe(gulp.dest('public/styleguide'))
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
});


gulp.task('default', function() {
  sequence('clean',
           'sass',
           'styleguide',
           'connect',
           'watch');
});
