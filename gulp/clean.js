'use strict';

var del = require('del');
var gulp = require('gulp');

var config = require('./config');

/**
 * Clean distribution and temporary directories.
 * @gulpTask clean
 */
gulp.task('clean', function() {
  return del([
    config.paths.dist,
    config.paths.tmp,
  ]);
});
