'use strict';

var config = require('./config');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');

gulp.task('locales', ['locales-angular'], function() {
  return buildLocales();
});

gulp.task('locales-reload', function() {
  return buildLocales().
      pipe(browserSync.stream());
});

gulp.task('locales:dist', ['locales-angular:dist'], function() {
  return buildLocales(true);
});

gulp.task('locales-angular', function() {
  return buildAngularLocales();
});

gulp.task('locales-angular:dist', function() {
  return buildAngularLocales(true);
});

function buildLocales(isDist) {
  var destination = path.join(config.paths.tmp, '/serve/' +
      config.locales.directory + '/');

  if (isDist) {
    destination = path.join(config.paths.dist, '/' + config.locales.directory +
        '/');
  }

  var options = {
    omit: config.locales.directory,
  };

  return gulp.src(
      path.join(config.paths.src, '/app/**/' + config.locales.directory +
          '/*.json')).
      pipe($.localesBundler(options)).
      pipe(gulp.dest(destination));
}

function buildAngularLocales(isDist) {
  if (config.locales.angular.used === undefined ||
      !config.locales.angular.used.length) {
    return;
  }

  var fileName = 'angular-locale_';
  if (config.locales.angular.used.length === 1) {
    fileName += config.locales.angular.used[0];
  }
  else {
    fileName += '{' + config.locales.angular.used.join() + '}';
  }
  fileName += '.js';

  var source = path.join(config.locales.angular.directory, '/' + fileName);
  var destination = path.join(config.paths.tmp, '/serve/' +
      config.locales.directory + '/');

  if (isDist) {
    destination = path.join(config.paths.dist, '/' + config.locales.directory +
        '/');
  }

  return gulp.src(source).
      pipe($.uglify({mangle: false})).
      on('error', config.errorHandler('Uglify')).
      pipe(gulp.dest(destination));
}
