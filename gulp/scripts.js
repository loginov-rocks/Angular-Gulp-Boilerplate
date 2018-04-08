'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

var config = require('./config');

var scriptsPath = path.join(config.paths.app, '/', config.patterns.scripts);

/**
 * Build scripts.
 * @gulptask scripts
 */
gulp.task('scripts', function() {
  return buildScripts(scriptsPath);
});

/**
 * Build scripts and watch for changes.
 * @gulptask scripts:watch
 */
gulp.task('scripts:watch', ['scripts'], function() {
  return watch();
});

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
      function(event) {
        if (event.type !== 'changed') {
          notOnlyChangedCallback();
          return;
        }

        buildScripts(event.path).
            pipe($.debug({title: 'scripts modified:'})).
            pipe(browserSync.stream());
      }
  );
}

exports.watch = watch;
