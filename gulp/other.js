'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = require('./config');

/**
 * Copy various not handled stuff to distribution dir.
 * @gulptask other
 */
gulp.task('other', () => {
  const filter = $.filter((file) => file.stat.isFile());

  return gulp.src([
    // Gather all files...
    path.join(config.paths.src, '/**/*'),
    path.join(config.paths.src, '/**/.*'),
    // excluding HTML entry, locales and "excluded" obviously.
    '!' + config.entry.html,
    path.join('!' + config.paths.app, config.patterns.locales),
    path.join('!' + config.paths.app, config.patterns.otherExcluded),
  ]).
      pipe(filter).
      pipe($.size({title: 'other'})).
      pipe(gulp.dest(config.paths.dist));
});
