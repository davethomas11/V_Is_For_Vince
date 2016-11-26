'use strict';

const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const jsPathClean = 'app/**/*.js';
const jsPathCleanMaps = 'app/**/*.js.map';
const jsPathIn = 'src/**/*.js';
const jsPathOut = 'app';
const scssPathClean = 'app/**/*.css';
const scssPathCleanMaps = 'app/**/*.css.map';
const scssPathIn = 'src/**/*.scss';
const scssPathOut = 'app';

/*
 * Run all build tasks.
 */
gulp.task('default', [ 'js', 'sass' ]);

/*
 * Delete all generated files.
 */
gulp.task('clean', [ 'clean:js', 'clean:sass' ]);

/*
 * Delete the generated JS files.
 */
gulp.task('clean:js', () => {
  return del([
    jsPathClean,
    jsPathCleanMaps
  ]);
});

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
 * Build the JS files.
 */
gulp.task('js', (cb) => {
  pump(
    [
      gulp.src(jsPathIn),
      sourcemaps.init(),
      babel({
        presets: [ 'es2015' ],
        plugins: [
          'transform-es2015-modules-systemjs', // allows for es6 modules (import/export)
          'transform-class-properties'
        ]
      }),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest(jsPathOut)
    ],
    cb
  );
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
  // watch the JS files for changes
  gulp.watch(jsPathIn, [ 'js' ]);

  // watch Sass files for changes
  gulp.watch(scssPathIn, [ 'sass' ]);
});