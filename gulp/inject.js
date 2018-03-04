'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var wiredep = require('wiredep').stream;

var config = require('./config');
var utils = require('./utils');

/**
 * Inject scripts and styles into HTML entry.
 * @gulptask inject
 */
gulp.task('inject', ['scripts', 'styles'], function() {
  var injectScripts = gulp.src(
      path.join(config.paths.app, '/', config.patterns.scripts)
  ).
      pipe($.angularFilesort()).
      on('error', utils.errorHandler('Angular Filesort'));

  var injectStyles = gulp.src(
      path.join(config.paths.serve, '/', config.patterns.stylesOutput),
      {read: false}
  );

  var injectOptions = {
    addRootSlash: false,
    ignorePath: [
      config.paths.serve,
      config.paths.src,
    ],
  };

  return gulp.src(config.entry.html).
      pipe($.inject(injectScripts, injectOptions)).
      pipe($.inject(injectStyles, injectOptions)).
      pipe(wiredep(config.plugins.wiredep)).
      pipe(gulp.dest(config.paths.serve));
});

/**
 * Start `inject` task and launch Browsersync reloading after.
 * @gulptask inject:reload
 */
gulp.task('inject:reload', ['inject'], function() {
  browserSync.reload();
});
