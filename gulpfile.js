const gulp = require('gulp');
const browserify = require('browserify');
const envify = require('envify/custom');
const del = require('del');
const reactify = require('reactify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
//const streamify = require('gulp-streamify');
const less = require('gulp-less');
const cssmin = require('gulp-minify-css');
const rename = require('gulp-rename');
const nightwatch = require('gulp-nightwatch');
const react = require('gulp-react');
const flow = require('gulp-flowtype');
const replace = require('gulp-replace');
const notify = require('gulp-notify');
const minimist = require('minimist');
const gulpif = require('gulp-if');

const paths = {
    css: ['./asserts/css/src/*.less'],
    js: ['./js/app/*.js',
        './js/app/component/*.js',
        './js/app/config/*.js',
        './js/app/search/*.js',
        './js/app/section/*.js',
        './js/app/untls/*.js',
    ],
    app_js: ['./js/app/app.js'],
    index: ['./index.html'],
};
const options = minimist(process.argv.slice(2), knownOptions);
var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'},
};

// date
const date = new Date();
const targetDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

gulp.task('clean', function(done) {
    del(['./js/build/*.js'], done);
    done();
});

gulp.task('js', gulp.series('clean', function(done) {
    let senv = 'production';
    let isUglify = true;

    if (options.env === 'development') {
        senv = 'development';
        isUglify = false;
    }

    browserify(paths.app_js).transform(envify({
        NODE_ENV: senv,
    }));
    browserify({
        entries: paths.app_js,
        debug: true,
        transform: [reactify],
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        // .pipe(gulpif(isUglify, streamify(uglify())))
        .pipe(gulp.dest('./js/build'))
        .pipe(notify('Gulp.js restarted'));

    done();
}));

gulp.task('css', function(done) {
    gulp.src(paths.css)
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./asserts/css/min/'))
        .pipe(connect.reload());
    done();
});

gulp.task('html', function(done) {
    gulp.src(paths.index)
        .pipe(connect.reload());
    done();
});

gulp.task('connect', function(done) {
    connect.server({
        port: 3000,
        livereload: true,
    });
    done();
});

gulp.task('watch', function(done) {
    gulp.watch(paths.index, gulp.series('html'));
    gulp.watch(paths.css, gulp.series('css'));
    gulp.watch(paths.js, gulp.series('js'));
    done();
});

gulp.task('typecheck', function(done) {
    return gulp.src(paths.app_js)
        .pipe(flow({
            all: false,
            weak: false,
            declarations: './declarations',
            killFlow: false,
            beep: true,
            abort: false,
        }))
        .pipe(react({stripTypes: true}));
    // Strip Flow type annotations before compiling
    done();
});

gulp.task('nightwatch', function() {
    gulp.src('').pipe(nightwatch({
        configFile: 'nightwatch.json',
    }));
});

gulp.task('ver-footer', function(done) {
    gulp.src(['js/app/section/footer.js'])
        .pipe(replace(/\%ver_replacement\%/g, targetDate))
        .pipe(rename('js/app/section/footer-ver.js'))
        .pipe(gulp.dest('./'));
    done();
});

/* default */
gulp.task('default', gulp.series('css', 'typecheck', 'ver-footer', 'js', 'connect', 'watch'));

/* java -jar selenium-server-standalone-2.51.0.jar */
gulp.task('test', gulp.series('nightwatch', function() {}));
