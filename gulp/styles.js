'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var wiredep = require('wiredep').stream;

var config = require('./config');
var utils = require('./utils');

/**
 * Build styles.
 * @gulptask styles
 */
gulp.task('styles', function() {
  return buildStyles();
});

/**
 * Build styles and watch for changes.
 * @gulptask styles:watch
 */
gulp.task('styles:watch', ['styles'], function() {
  return watch();
});

/**
 * Inject input SCSS styles into entry and build output CSS styles.
 * @return {*}
 */
function buildStyles() {
  var injectStyles = gulp.src(
      [
        path.join(config.paths.app, '/', config.patterns.stylesInput),
        '!' + config.entry.styles,
      ],
      {read: false}
  );

  var injectOptions = {
    addRootSlash: false,
    endtag: '// endinject',
    starttag: '// inject',
  };

  return gulp.src(config.entry.styles).
      pipe($.inject(injectStyles, injectOptions)).
      // Inject Bower Sass dependencies if present.
      pipe(wiredep(config.plugins.wiredep)).
      pipe($.sourcemaps.init()).
      pipe($.sass(config.plugins.sass)).on('error', utils.errorHandler('Sass')).
      pipe($.autoprefixer()).on('error', utils.errorHandler('Autoprefixer')).
      pipe($.sourcemaps.write(config.paths.maps)).
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
      path.join(config.paths.app, '/', config.patterns.stylesWatching),
      function(event) {
        if (event.type !== 'changed') {
          notOnlyChangedCallback();
          return;
        }

        buildStyles().
            pipe($.debug({title: 'styles modified:'})).
            // Push only output CSS styles to the BrowserSync stream to prevent
            // full reloading.
            pipe(browserSync.stream({match: config.patterns.stylesOutput}));
      }
  );
}

exports.watch = watch;
