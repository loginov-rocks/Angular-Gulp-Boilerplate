'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

var config = require('./config');

/**
 * Copy and flatten fonts from Bower packages to distribution dir.
 * @gulptask fonts
 */
gulp.task('fonts', function() {
  return gulp.src(mainBowerFiles()).
      pipe($.filter(config.patterns.fonts)).
      pipe($.flatten()).
      pipe($.size({title: 'fonts'})).
      pipe(gulp.dest(config.paths.fonts));
});
