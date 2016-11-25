'use strict';

let del = require('del');
let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');

const scssPathClean = 'app/**/*.css';
const scssPathCleanMaps = 'app/**/*.css.map';
const scssPathIn = 'src/**/*.scss';
const scssPathOut = 'app';

/*
 * Run all build tasks.
 */
gulp.task('default', [ 'sass' ]);

/*
 * Delete all generated files.
 */
gulp.task('clean', [ 'clean:sass' ]);

/*
 * Delete the generated CSS files.
 */
gulp.task('clean:sass', () => {
  return del([
    scssPathClean,
    scssPathCleanMaps
  ])
});

/*
 * Build the sass files.
 */
gulp.task('sass', () => {
  return gulp.src(scssPathIn)
             .pipe(sourcemaps.init())
             .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest(scssPathOut));
});

/*
 * Watch the source files for changes.
 */
gulp.task('watch', () => {
  // watch Sass files for changes
  gulp.watch(scssPathIn, [ 'sass' ]);
});