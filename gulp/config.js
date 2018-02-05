'use strict';

/**
 * Configuration.
 * @type {{locales: {Object}, paths: {Object}, plugins: {Object}, sass: {Object}}}
 */
var config = {
  locales: {},
  paths: {},
  plugins: {},
  sass: {},
};

/**
 * Locales configuration.
 * @type {{angular: {directory: string, used: string[]}, directory: string}}
 */
config.locales = {
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
 * @type {{angularTemplatecache: string, dist: string, fonts: string, partials: string, src: string, tmp: string}}
 */
config.paths = {
  angularTemplatecache: 'templateCacheHtml.js',
  dist: 'dist',
  fonts: 'dist/fonts',
  partials: '.tmp/partials',
  src: 'src',
  tmp: '.tmp',
};

/**
 * Configuration object for `gulp-angular-templatecache` plugin.
 * @see https://www.npmjs.com/package/gulp-angular-templatecache
 * @type {Object}
 */
config.plugins.angularTemplatecache = {
  module: 'app',
  root: 'app',
};

/**
 * Configuration object for `gulp-htmlmin` plugin.
 * @see https://www.npmjs.com/package/gulp-htmlmin
 * @type {Object}
 */
config.plugins.htmlmin = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
};

/**
 * Configuration object for `gulp-sass` plugin.
 * @see https://www.npmjs.com/package/gulp-sass
 * @type {Object}
 */
config.plugins.sass = {
  outputStyle: 'expanded',
  precision: 10,
};

/**
 * Configuration object for `wiredep`.
 * @see https://www.npmjs.com/package/wiredep
 * @type {Object}
 */
config.plugins.wiredep = {
  directory: 'bower_components',
};

/**
 * Sass additional options.
 * @type {{excludeUnderscored: boolean}}
 */
config.sass = {
  excludeUnderscored: true,
};

module.exports = config;
