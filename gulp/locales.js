'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = require('./config');
const utils = require('./utils');

const localesPath = path.join(config.paths.app, config.patterns.locales);

/**
 * Build locales.
 * @gulptask locales
 */
gulp.task('locales', ['locales-angular'], () => buildAppLocales());

/**
 * Build locales to distribution dir.
 * @gulptask locales:dist
 */
gulp.task('locales:dist', ['locales-angular:dist'], () => {
  return buildAppLocales(true).
      pipe($.size({title: 'locales'}));
});

/**
 * Build locales and watch for changes.
 * @gulptask locales:watch
 */
gulp.task('locales:watch', ['locales'], () => {
  return gulp.watch(
      localesPath,
      () => {
        buildAppLocales().
            pipe($.debug({title: 'locales modified:'})).
            pipe(browserSync.stream());
      });
});

/**
 * Build Angular locales only.
 * @gulptask locales-angular
 */
gulp.task('locales-angular', () => buildAngularLocales());

/**
 * Build Angular locales only to distribution dir.
 * @gulptask locales-angular:dist
 */
gulp.task('locales-angular:dist', () => {
  return buildAngularLocales(true).
      pipe($.size({title: 'locales-angular'}));
});

/**
 * Build app locales to flagged destination.
 * @param {boolean} [isDist=false]
 * @return {*}
 */
function buildAppLocales(isDist) {
  isDist = isDist || false;

  const dest = getDestLocalesDir(isDist);

  return gulp.src(localesPath).
      pipe($.localesBundler({omit: config.locales.directory})).
      pipe(gulp.dest(dest));
}

/**
 * Build Angular locales to flagged destination.
 * @param {boolean} [isDist=false]
 * @return {*}
 */
function buildAngularLocales(isDist) {
  isDist = isDist || false;

  // Skip if no Angular locales used.
  if (config.locales.angular.used === undefined || // eslint-disable-line angular/definedundefined
      !config.locales.angular.used.length) {
    return;
  }

  // Build file pattern for Angular localization files used.
  let filePattern = 'angular-locale_';
  if (config.locales.angular.used.length === 1) {
    filePattern += config.locales.angular.used[0];
  }
  else {
    filePattern += '{' + config.locales.angular.used.join() + '}';
  }
  filePattern += '.js';

  const src = path.join(config.locales.angular.directory, filePattern);
  const dest = getDestLocalesDir(isDist);

  return gulp.src(src).
      pipe($.uglify(config.plugins.uglifyAngularLocales)).
      on('error', utils.errorHandler('Uglify')).
      pipe(gulp.dest(dest));
}

/**
 * Get destination locales dir for flagged destination.
 * @param {boolean} [isDist=false]
 * @return {string}
 */
function getDestLocalesDir(isDist) {
  isDist = isDist || false;

  return path.join(
      (isDist ? config.paths.dist : config.paths.serve),
      config.locales.directory);
}
