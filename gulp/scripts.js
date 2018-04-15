'use strict';

const browserSync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = require('./config');

const scriptsPath = path.join(config.paths.app, config.patterns.scripts);

/**
 * Build scripts.
 * @gulptask scripts
 */
gulp.task('scripts', ['scripts:clean'], () => buildScripts(scriptsPath));

/**
 * Clean temporary scripts.
 * @gulptask scripts:clean
 */
gulp.task('scripts:clean', () => {
  return del([
    path.join(config.paths.serve, config.patterns.scripts),
    // Exclude Angular localization files.
    path.join('!' + config.paths.serve, config.locales.directory, '*.js'),
  ]);
});

/**
 * Build scripts and watch for changes.
 * @gulptask scripts:watch
 */
gulp.task('scripts:watch', ['scripts'], () => watch());

/**
 * Build scripts from specified sources.
 * @param {*} src
 * @param {*} relative
 * @return {*}
 */
function buildScripts(src, relative = '') {
  const mapsPath = path.join(
      path.relative(path.join(config.paths.serve, relative),
          config.paths.serve),
      config.paths.maps,
      relative);

  return gulp.src(src).
      pipe($.eslint()).
      pipe($.eslint.format()).
      pipe($.sourcemaps.init()).
      pipe($.babel()).
      pipe($.sourcemaps.write(mapsPath)).
      pipe(gulp.dest(path.join(config.paths.serve, relative)));
}

/**
 * Watch for changes.
 * @param {Function|null} [notOnlyChangedCallback=null]
 * @return {*}
 */
function watch(notOnlyChangedCallback) {
  notOnlyChangedCallback = notOnlyChangedCallback || null;

  return gulp.watch(
      scriptsPath,
      (event) => {
        if (event.type !== 'changed') {
          notOnlyChangedCallback();
          return;
        }

        buildScripts(event.path,
            path.relative(config.paths.app, path.dirname(event.path))).
            pipe($.debug({title: 'scripts modified:'})).
            pipe(browserSync.stream());
      });
}

module.exports = {
  watch,
};
