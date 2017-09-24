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


gulp.task('styleguide', function() {

    var options = {
        source: [
            'src/scss/',
        ],
        destination: 'public/styelguide/',

        // builder
        builder: 'src/styleguide/builder/',

        // The css and js paths are URLs, like '/misc/jquery.js'.
        // The following paths are relative to the generated style guide.
        css: [
            '../css/chalkboard.css'
        ],
        js: [
        ],

        homepage: 'styleguide/home.md',
        title: 'Chalkboard'
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
});




gulp.task('default', function() {
    sequence('clean',
             'sass',
             'styleguide',
             'connect',
             'watch');
});
