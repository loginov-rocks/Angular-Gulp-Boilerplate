'use strict';

var config = require('./config');

var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');

gulp.task('watch', ['inject', 'locales'], function() {
  gulp.watch([path.join(config.paths.src, '/*.html'), 'bower.json'],
      ['inject-reload']);

  gulp.watch([
    path.join(config.paths.src, '/app/**/*.css'),
    path.join(config.paths.src, '/app/**/*.scss'),
  ], function(event) {
    if (isOnlyChange(event)) {
      gulp.start('styles-reload');
    }
    else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(config.paths.src, '/app/**/*.js'), function(event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts-reload');
    }
    else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(config.paths.src, '/app/**/' + config.locales.directory +
      '/**/*.json'), ['locales-reload']);

  gulp.watch(path.join(config.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});

function isOnlyChange(event) {
  return event.type === 'changed';
}
