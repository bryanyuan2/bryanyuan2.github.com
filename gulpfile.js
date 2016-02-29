var gulp = require('gulp'),
    browserify = require('browserify'),
    del = require('del'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    streamify = require('gulp-streamify'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    nightwatch = require('gulp-nightwatch'),
    jshint = require('gulp-jshint'),
    react = require('gulp-react'),
    cache = require('gulp-cached'),
    flow = require('gulp-flowtype'),
    replace = require('gulp-replace'),
    buildDate = require('gulp-build-date');

var paths = {
    css:['./asserts/css/*.less'],
    js: ['./js/app/*.js', './js/app/section/*.js', './test/components/*.js'],
    app_js: ['./js/app/app.js'],
    index: ['./index.html']
};

// date
var date = new Date();
var targetDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

gulp.task('clean', function(done) {
  del(['./js/build/*.js'], done);
});

gulp.task('js', ['clean'], function() {
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./js/build'));
});

gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./asserts/css/'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(paths.index)
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 3000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.index, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(cache('jshint'))
    .pipe(react())
    .on('error', function(err) {
      console.error('JSX ERROR in ' + err.fileName);
      console.error(err.message);
      this.end();
    })
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('typecheck', function() {
  return gulp.src(paths.app_js)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }))
    .pipe(react({ stripTypes: true }))
    // Strip Flow type annotations before compiling
});

gulp.task('nightwatch', function() {
  gulp.src('')
    .pipe(nightwatch({
      configFile: 'nightwatch.json'
    }));
});


gulp.task('ver-footer', function(){
  gulp.src(['js/app/footer.js'])
    .pipe(replace(/\%ver_replacement\%/g, targetDate))
    .pipe(rename("js/app/footer-ver.js"))
    .pipe(gulp.dest('./'));
});


/* default */
gulp.task('default', ['css', 'typecheck', 'jshint', 'ver-footer', 'js', 'connect', 'watch']);

/* java -jar selenium-server-standalone-2.51.0.jar */
gulp.task('test', ['nightwatch']);
