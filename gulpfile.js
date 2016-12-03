'use strict';

const del = require('del');
const gulp = require('gulp');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

const cleanPath = 'app/*';
// Sass
const scssPathIn = 'src/**/*.scss';
const scssPathOut = 'app';
// TypeScript
const tsConfigFile = './tsconfig.json';
const tsPathIn = 'src/**/*.ts';
const tsPathOut = 'app';

const tsProject = ts.createProject(tsConfigFile);

/*
 * Run all build tasks.
 */
gulp.task('default', [ 'ts', 'js', 'sass' ]);

/*
 * Delete all generated files.
 */
gulp.task('clean', () => {
  return del([ cleanPath ]);
});

/*
 * Build the TypeScript files.
 */
gulp.task('ts', (cb) => {
  pump(
    [
      gulp.src(tsPathIn),
      sourcemaps.init(),
      tsProject(),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest(tsPathOut)
    ],
    cb
  );
});

/*
 * Copy JS files.
 */
gulp.task('js', (cb) => {
  pump(
    [
      gulp.src('src/**/*.js'),
      gulp.dest(tsPathOut)
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
  gulp.watch(tsPathIn, [ 'ts' ]);

  // watch Sass files for changes
  gulp.watch(scssPathIn, [ 'sass' ]);
});