'use strict';

var gulpUtil = require('gulp-util');

/**
 * Configuration object for `gulp-htmlmin` plugin.
 * @see https://www.npmjs.com/package/gulp-htmlmin
 * @type {Object}
 */
exports.htmlmin = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
};

/**
 * Locales configuration.
 * @type {{angular: {directory: string, used: string[]}, directory: string}}
 */
exports.locales = {
  angular: {
    directory: 'bower_components/angular-i18n',
    used: [
      'en',
      'ru',
    ],
  },
  directory: 'locales',
};

/**
 * Directories used.
 * @type {{dist: string, fonts: string, partials: string, src: string, tmp: string}}
 */
exports.paths = {
  dist: 'dist',
  fonts: 'dist/fonts',
  partials: '.tmp/partials',
  src: 'src',
  tmp: '.tmp',
};

/**
 * Configuration object for `gulp-sass` plugin.
 * @see https://www.npmjs.com/package/gulp-sass
 * @type {{excludeUnderscored: boolean, options: {Object}}}
 */
exports.sass = {
  excludeUnderscored: true,
  options: {
    outputStyle: 'expanded',
    precision: 10,
  },
};

/**
 * Configuration object for `gulp-angular-templatecache` plugin.
 * @see https://www.npmjs.com/package/gulp-angular-templatecache
 * @type {{filename: string, options: {Object}}}
 */
exports.templatecache = {
  filename: 'templateCacheHtml.js',
  options: {
    module: 'app',
    root: 'app',
  },
};

/**
 * Configuration object for `wiredep`.
 * @see https://www.npmjs.com/package/wiredep
 * @type {Object}
 */
exports.wiredep = {
  directory: 'bower_components',
};

/**
 * Common error handler.
 * @param {string} title
 * @return {Function}
 */
exports.errorHandler = function(title) {
  return function(err) {
    gulpUtil.log(gulpUtil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
