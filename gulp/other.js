'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

var config = require('./config');

/**
 * Copy various not handled stuff to the distribution dir.
 * @gulpTask other
 */
gulp.task('other', function() {
  var filter = $.filter(function(file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(config.paths.src, '/**/*'),
    path.join(config.paths.src, '/**/.*'),
    path.join('!' + config.paths.src, '/**/*.{css,html,js,scss}'),
    path.join('!' + config.paths.src, '/app/**/', config.locales.directory,
      '/*.json'),
  ]).
    pipe(filter).
    pipe($.size({title: 'other'})).
    pipe(gulp.dest(config.paths.dist));
});
