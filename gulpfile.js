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

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});


gulp.task('default', function() {
    sequence('clean',
             'sass',
             'connect',
             'watch');
});
