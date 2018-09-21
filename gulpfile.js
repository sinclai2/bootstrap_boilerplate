const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

// ---------Tasks---------------
gulp.task('pug', function () {
  return gulp.src('./src/views/**/*.pug')
      .pipe(plumber())
      .pipe(pug({
        doctype: 'html',
        pretty: false,
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
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'serve']);
