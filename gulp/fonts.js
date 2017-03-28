'use strict';

var config = require('./config');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files'],
});
var gulp = require('gulp');
var path = require('path');

gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles()).
      pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}')).
      pipe($.flatten()).
      pipe(gulp.dest(path.join(config.paths.dist, '/fonts/')));
});
