'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');
const wiredep = require('wiredep').stream;

const config = require('./config');
const utils = require('./utils');

/**
 * Inject scripts and styles into HTML entry.
 * @gulptask inject
 */
gulp.task('inject', ['scripts', 'styles'], () => {
  const injectScripts = gulp.src(
      path.join(config.paths.serve, config.patterns.scripts)).
      pipe($.angularFilesort()).
      on('error', utils.errorHandler('Angular Filesort'));

  const injectStyles = gulp.src(
      path.join(config.paths.serve, config.patterns.stylesOutput),
      {read: false});

  const injectOptions = {
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
gulp.task('inject:reload', ['inject'], () => {
  browserSync.reload();
});
