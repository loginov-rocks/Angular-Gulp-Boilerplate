'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');

var config = require('./config');
var scripts = require('./scripts');
var styles = require('./styles');

/**
 * Build project and watch for all changes.
 * @gulptask watch
 */
gulp.task('watch', ['inject', 'locales:watch'], function() {
  // When any of root HTML files or `bower.json` updates, we want to launch
  // `inject` task, since it injects Bower dependencies.
  gulp.watch([path.join(config.paths.src, '/*.html'), 'bower.json'],
    ['inject:reload']);

  // Initially launch only `locales:watch` tasks, because `scripts` and `styles`
  // are launched by `inject` task. Here we're using exported watch functions
  // directly instead of `gulp.start()` to add callback when not only `changed`
  // event occurs, but `added` or `deleted` — in this case we want to launch
  // `inject` task again.
  scripts.watch(function() {
    gulp.start('inject:reload');
  });

  styles.watch(function() {
    gulp.start('inject:reload');
  });

  // Reload when any of app HTML files updates.
  gulp.watch(path.join(config.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
