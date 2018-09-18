var gulp = require('gulp');
var pug = require('gulp-pug');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./front/build/html"
        }
    });
});

gulp.task('html', function(){
    return gulp.src('./front/views/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('./front/build/html'))
  });
  
  gulp.task('css', function(){
    return gulp.src('./front/views/css/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./front/build/css'))
  });
  
  gulp.task('js', function(){
    return gulp.src('./front/js/*.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./front/build/js'))
  });
  
  gulp.task('default', [ 'browser-sync', 'html', 'css', 'js' ]);