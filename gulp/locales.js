'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

var config = require('./config');
var utils = require('./utils');

var localesPath = path.join(config.paths.src, '/app/**/',
  config.locales.directory, '/*.json');

/**
 * Build locales.
 * @gulptask locales
 */
gulp.task('locales', ['locales-angular'], function() {
  return buildAppLocales();
});

/**
 * Build locales to the distribution dir.
 * @gulptask locales:dist
 */
gulp.task('locales:dist', ['locales-angular:dist'], function() {
  return buildAppLocales(true).
    pipe($.size({title: 'locales'}));
});

/**
 * Build locales and watch for changes.
 * @gulptask locales:watch
 */
gulp.task('locales:watch', ['locales'], function() {
  return gulp.watch(localesPath, function() {
    buildAppLocales().
      pipe($.debug({title: 'locales modified:'})).
      pipe(browserSync.stream());
  });
});

/**
 * Build Angular locales only.
 * @gulptask locales-angular
 */
gulp.task('locales-angular', function() {
  return buildAngularLocales();
});

/**
 * Build Angular locales only to the distribution dir.
 * @gulptask locales-angular:dist
 */
gulp.task('locales-angular:dist', function() {
  return buildAngularLocales(true).
    pipe($.size({title: 'locales-angular'}));
});

/**
 * Build app locales to the flagged destination.
 * @param {boolean} [isDist=false]
 * @return {*}
 */
function buildAppLocales(isDist) {
  isDist = isDist || false;

  var dest = getDestLocalesDir(isDist);

  return gulp.src(localesPath).
    pipe($.localesBundler({omit: config.locales.directory})).
    pipe(gulp.dest(dest));
}

/**
 * Build Angular locales to the flagged destination.
 * @param {boolean} [isDist=false]
 * @return {*}
 */
function buildAngularLocales(isDist) {
  isDist = isDist || false;

  // Skip if no Angular locales used.
  if (config.locales.angular.used === undefined ||
    !config.locales.angular.used.length) {
    return;
  }

  // Build file pattern for Angular localization files used.
  var filePattern = 'angular-locale_';
  if (config.locales.angular.used.length === 1) {
    filePattern += config.locales.angular.used[0];
  }
  else {
    filePattern += '{' + config.locales.angular.used.join() + '}';
  }
  filePattern += '.js';

  var src = path.join(config.locales.angular.directory, '/', filePattern);
  var dest = getDestLocalesDir(isDist);

  return gulp.src(src).
    pipe($.uglify({mangle: false})).on('error', utils.errorHandler('Uglify')).
    pipe(gulp.dest(dest));
}

/**
 * Get destination locales dir for the flagged destination.
 * @param {boolean} [isDist=false]
 * @return {string}
 */
function getDestLocalesDir(isDist) {
  isDist = isDist || false;

  if (isDist) {
    return path.join(config.paths.dist, '/', config.locales.directory);
  }

  return path.join(config.paths.tmp, '/serve/', config.locales.directory);
}
