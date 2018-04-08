'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = require('./config');

/**
 * Create template cache from HTML partials.
 * @gulptask partials
 */
gulp.task('partials', () => {
  return gulp.src(path.join(config.paths.app, config.patterns.html)).
      pipe($.htmlmin(config.plugins.htmlmin)).
      pipe($.angularTemplatecache(
          config.paths.angularTemplatecache,
          config.plugins.angularTemplatecache)).
      pipe(gulp.dest(config.paths.partials));
});
