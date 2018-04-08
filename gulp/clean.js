'use strict';

const del = require('del');
const gulp = require('gulp');

const config = require('./config');

/**
 * Clean distribution and temporary directories.
 * @gulptask clean
 */
gulp.task('clean', () => {
  return del([
    config.paths.dist,
    config.paths.tmp,
  ]);
});
