'use strict';

const gulp = require('gulp');

/**
 * Clean used directories and build production version ready to deploy.
 * @gulptask default
 */
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
