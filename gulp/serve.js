'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');
const util = require('util');

const config = require('./config');

/**
 * Build project, start watching for all changes and serve it using Browsersync.
 * @gulptask serve
 */
gulp.task('serve', ['watch'], () => {
  initBrowsersync([
    config.paths.serve,
    config.paths.src,
  ]);
});

/**
 * Build production version and serve it using Browsersync.
 * @gulptask serve:dist
 */
gulp.task('serve:dist', ['build'], () => {
  initBrowsersync(config.paths.dist);
});

/**
 * Initialize Browsersync.
 * @see https://browsersync.io/docs
 * @param {string|Array} baseDir
 * @return {void}
 */
function initBrowsersync(baseDir) {
  let routes = null;

  // Rewrite path to `bower_components` if serving sources.
  if (baseDir === config.paths.src ||
      (util.isArray(baseDir) && baseDir.indexOf(config.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
    };
  }

  browserSync.init({
    server: {
      baseDir: baseDir,
      routes: routes,
    },
    single: true,
    startPath: '/',
  });
}
