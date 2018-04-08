'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = require('./config');

const scriptsPath = path.join(config.paths.app, config.patterns.scripts);

/**
 * Build scripts.
 * @gulptask scripts
 */
gulp.task('scripts', () => buildScripts(scriptsPath));

/**
 * Build scripts and watch for changes.
 * @gulptask scripts:watch
 */
gulp.task('scripts:watch', ['scripts'], () => watch());

/**
 * Build scripts from specified sources.
 * @param {*} src
 * @return {*}
 */
function buildScripts(src) {
  return gulp.src(src).
      pipe($.eslint()).
      pipe($.eslint.format()).
      pipe($.babel()).
      pipe(gulp.dest(config.paths.serve));
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

        buildScripts(event.path).
            pipe($.debug({title: 'scripts modified:'})).
            pipe(browserSync.stream());
      });
}

module.exports = {
  watch,
};
