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
  // When HTML entry or `bower.json` updates, launch `inject` task to inject
  // Bower dependencies.
  gulp.watch(
      [
        config.entry.html,
        'bower.json',
      ],
      ['inject:reload']
  );

  // Initially only `locales:watch` tasks are launched, because `scripts` and
  // `styles` are launched by `inject` task. Here we're using exported watch
  // functions directly instead of `gulp.start()` to add callback when not only
  // `changed` event occurs, but `added` or `deleted` — in this case we want to
  // launch `inject` task again.
  scripts.watch(function() {
    gulp.start('inject:reload');
  });

  styles.watch(function() {
    gulp.start('inject:reload');
  });

  // Reload when any of HTML files updates.
  gulp.watch(
      path.join(config.paths.app, '/', config.patterns.html),
      function(event) {
        browserSync.reload(event.path);
      }
  );
});
