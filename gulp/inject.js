'use strict';

var config = require('./config');

var $ = require('gulp-load-plugins')();
var _ = require('lodash');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');
var wiredep = require('wiredep').stream;

gulp.task('inject', ['scripts', 'styles'], function() {
  var injectStyles = gulp.src([
    path.join(config.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + config.paths.tmp, '/serve/app/vendor.css'),
  ], {read: false});

  var injectScripts = gulp.src([
    path.join(config.paths.src, '/app/**/*.module.js'),
    path.join(config.paths.src, '/app/**/*.js'),
  ]).
      pipe($.angularFilesort()).
      on('error', config.errorHandler('AngularFilesort'));

  var injectOptions = {
    addRootSlash: false,
    ignorePath: [config.paths.src, path.join(config.paths.tmp, '/serve')],
  };

  return gulp.src(path.join(config.paths.src, '/*.html')).
      pipe($.inject(injectStyles, injectOptions)).
      pipe($.inject(injectScripts, injectOptions)).
      pipe(wiredep(_.extend({}, config.wiredep))).
      pipe(gulp.dest(path.join(config.paths.tmp, '/serve')));
});

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});
