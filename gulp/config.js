'use strict';

/**
 * Configuration.
 * @type {{locales: {Object}, paths: {Object}, plugins: {Object}}}
 */
var config = {
  locales: {},
  paths: {},
  plugins: {},
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
 * @type {{dist: string, fonts: string, partials: string, src: string, tmp: string}}
 */
config.paths = {
  dist: 'dist',
  fonts: 'dist/fonts',
  partials: '.tmp/partials',
  src: 'src',
  tmp: '.tmp',
};

/**
 * Configuration object for `gulp-angular-templatecache` plugin.
 * @see https://www.npmjs.com/package/gulp-angular-templatecache
 * @type {{filename: string, options: {Object}}}
 */
config.plugins.angularTemplatecache = {
  filename: 'templateCacheHtml.js',
  options: {
    module: 'app',
    root: 'app',
  },
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
 * @type {{excludeUnderscored: boolean, options: {Object}}}
 */
config.plugins.sass = {
  excludeUnderscored: true,
  options: {
    outputStyle: 'expanded',
    precision: 10,
  },
};

/**
 * Configuration object for `wiredep`.
 * @see https://www.npmjs.com/package/wiredep
 * @type {Object}
 */
config.plugins.wiredep = {
  directory: 'bower_components',
};

module.exports = config;
