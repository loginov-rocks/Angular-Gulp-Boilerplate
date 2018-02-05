'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

var config = require('./config');

/**
 * Create template cache from HTML partials.
 * @gulptask partials
 */
gulp.task('partials', function() {
  return gulp.src([
    path.join(config.paths.src, '/app/**/*.html'),
    path.join(config.paths.tmp, '/serve/app/**/*.html'),
  ]).
    pipe($.htmlmin(config.plugins.htmlmin)).
    pipe($.angularTemplatecache(config.paths.angularTemplatecache,
      config.plugins.angularTemplatecache)).
    pipe(gulp.dest(config.paths.partials));
});
