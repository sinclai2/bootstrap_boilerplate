const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

// ---------Tasks---------------
gulp.task('pug', function () {
  return gulp.src('./src/views/**/*.pug')
      .pipe(plumber())
      .pipe(pug({
        doctype: 'html',
        pretty: true,
      }))
      .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 99 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.reload({
        stream: true,
      }));
});

gulp.task('script', function () {
  gulp.src('./src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
});

// -------------Watch-------------
gulp.task('watch', function () {
  gulp.watch('./src/views/**/*.pug', ['pug']);
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['script']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'serve']);
