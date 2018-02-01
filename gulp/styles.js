'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');
var path = require('path');
var wiredep = require('wiredep').stream;

var config = require('./config');

var indexPath = path.join(config.paths.src, '/app/index.scss');

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
 * Inject all SCSS files to the index file and build CSS.
 * @return {*}
 */
function buildStyles() {
  // What to inject?
  var injectFiles = gulp.src([
    // Exclude underscored files from injecting depending on configuration.
    path.join(config.paths.src, '/app/**/',
      (config.sass.excludeUnderscored ? '[^_]' : '') + '*.scss'),
    '!' + indexPath,
  ], {read: false});

  // How to inject?
  var injectOptions = {
    addRootSlash: false,
    transform: function(filePath) {
      filePath = filePath.replace(path.join(config.paths.src, '/app/'), '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
  };

  return gulp.src(indexPath).
    pipe($.inject(injectFiles, injectOptions)).
    // Inject Bower Sass dependencies if present.
    pipe(wiredep(_.extend({}, config.wiredep))).
    pipe($.sourcemaps.init()).
    pipe($.sass(config.sass.options)).on('error', config.errorHandler('Sass')).
    pipe($.autoprefixer()).on('error', config.errorHandler('Autoprefixer')).
    pipe($.sourcemaps.write('maps')).
    pipe(gulp.dest(path.join(config.paths.tmp, '/serve/app/')));
}

/**
 * Watch for changes.
 * @param {Function|null} [notOnlyChangedCallback=null]
 * @return {*}
 */
function watch(notOnlyChangedCallback) {
  notOnlyChangedCallback = notOnlyChangedCallback || null;

  return gulp.watch(path.join(config.paths.src, '/app/**/*.scss'),
    function(event) {
      if (event.type !== 'changed') {
        notOnlyChangedCallback();
        return;
      }

      buildStyles().
        pipe($.debug({title: 'styles modified:'})).
        // Push only CSS files to the BrowserSync stream to prevent full reload.
        pipe(browserSync.stream({match: '**/*.css'}));
    });
}

exports.watch = watch;
