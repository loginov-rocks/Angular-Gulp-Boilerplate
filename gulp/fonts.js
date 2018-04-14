'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const mainBowerFiles = require('main-bower-files');

const config = require('./config');

/**
 * Copy and flatten fonts from Bower packages to distribution dir.
 * @gulptask fonts
 */
gulp.task('fonts', () => {
  return gulp.src(mainBowerFiles()).
      pipe($.filter(config.patterns.fonts)).
      pipe($.flatten()).
      pipe($.size({title: 'fonts'})).
      pipe(gulp.dest(config.paths.fonts));
});
