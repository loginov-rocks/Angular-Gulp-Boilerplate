'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');
var path = require('path');
var wiredep = require('wiredep').stream;

var config = require('./config');
var utils = require('./utils');

var destPath = path.join(config.paths.tmp, '/serve');

/**
 * Inject scripts and styles into HTML files placed directly in the source dir.
 * @gulptask inject
 */
gulp.task('inject', ['scripts', 'styles'], function() {
  var injectScripts = gulp.src(path.join(config.paths.src, '/app/**/*.js')).
    pipe($.angularFilesort()).
    on('error', utils.errorHandler('Angular Filesort'));

  var injectStyles = gulp.src(path.join(config.paths.tmp,
    '/serve/app/**/*.css'), {read: false});

  var injectOptions = {
    addRootSlash: false,
    ignorePath: [
      config.paths.src,
      destPath,
    ],
  };

  return gulp.src(path.join(config.paths.src, '/*.html')).
    pipe($.inject(injectScripts, injectOptions)).
    pipe($.inject(injectStyles, injectOptions)).
    pipe(wiredep(_.extend({}, config.plugins.wiredep))).
    pipe(gulp.dest(destPath));
});

/**
 * Start `inject` task and launch Browsersync reloading after.
 * @gulptask inject:reload
 */
gulp.task('inject:reload', ['inject'], function() {
  browserSync.reload();
});
