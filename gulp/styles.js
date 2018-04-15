'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');
const wiredep = require('wiredep').stream;

const config = require('./config');
const utils = require('./utils');

/**
 * Build styles.
 * @gulptask styles
 */
gulp.task('styles', () => buildStyles());

/**
 * Build styles and watch for changes.
 * @gulptask styles:watch
 */
gulp.task('styles:watch', ['styles'], () => watch());

/**
 * Inject input SCSS styles into entry and build output CSS styles.
 * @return {*}
 */
function buildStyles() {
  const injectStyles = gulp.src(
      [
        path.join(config.paths.app, config.patterns.stylesInput),
        '!' + config.entry.styles,
      ],
      {read: false});

  const injectOptions = {
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
      path.join(config.paths.app, config.patterns.stylesWatching),
      (event) => {
        if (event.type !== 'changed') {
          notOnlyChangedCallback();
          return;
        }

        buildStyles().
            pipe($.debug({title: 'styles modified:'})).
            // Push only output CSS styles to the BrowserSync stream to prevent
            // full reloading.
            pipe(browserSync.stream({match: config.patterns.stylesOutput}));
      });
}

module.exports = {
  watch,
};
