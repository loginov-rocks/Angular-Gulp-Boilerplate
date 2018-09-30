'use strict';

const path = require('path');

/**
 * Configuration.
 * @type {{entry: {Object}, locales: {Object}, patterns: {Object}, paths: {Object}, plugins: {Object}}}
 */
const config = {
  entry: {},
  locales: {},
  patterns: {},
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
 * Patterns used.
 * @type {{fonts: string, html: string, locales: string, otherExcluded: string, scripts: string, stylesInput: string, stylesOutput: string, stylesWatching: string}}
 */
config.patterns = {
  fonts: '**/*.{eot,otf,svg,ttf,woff,woff2}',       // relative to main Bower files
  html: '**/*.html',                                // relative to `config.paths.app`
  locales: `**/${config.locales.directory}/*.json`, // relative to `config.paths.app`
  otherExcluded: '**/*.{css,html,js,scss}',         // relative to `config.paths.app`
  scripts: '**/*.js',                               // relative to `config.paths.app`
  stylesInput: '**/[^_]*.scss',                     // relative to `config.paths.app`
  stylesOutput: '**/*.css',                         // relative to `config.paths.serve`
  stylesWatching: '**/*.scss',                      // relative to `config.paths.app`
};

/**
 * Paths used.
 * @type {{angularTemplatecache: string, app: string, dist: string, fonts: string, maps: string, partials: string, serve: string, src: string, tmp: string}}
 */
config.paths = {
  angularTemplatecache: 'angularTemplatecache.js',
  app: 'src/app',
  dist: 'dist',
  fonts: 'dist/fonts',
  maps: 'maps',
  partials: '.tmp/partials',
  serve: '.tmp/serve',
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
 * Configuration object for `gulp-cssnano` plugin.
 * @see https://www.npmjs.com/package/gulp-cssnano
 * @type {Object}
 */
config.plugins.cssnano = {
  zindex: false,
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
 * Configuration object for `gulp-uglify` plugin.
 * @see https://www.npmjs.com/package/gulp-uglify
 * @type {Object}
 */
config.plugins.uglify = {
  output: {
    comments: 'some',
  },
};

/**
 * Configuration object for `gulp-uglify` plugin, used when handling Angular
 * locales.
 * @see https://www.npmjs.com/package/gulp-uglify
 * @type {Object}
 */
config.plugins.uglifyAngularLocales = {
  mangle: false,
};

/**
 * Configuration object for `wiredep`.
 * @see https://www.npmjs.com/package/wiredep
 * @type {Object}
 */
config.plugins.wiredep = {
  directory: 'bower_components',
  overrides: {
    'normalize-css': {
      'main': ['normalize.css'],
    },
  },
};

/**
 * Entry points, set below other properties to use them.
 * @type {{html: string, styles: string}}
 */
config.entry = {
  html: path.join(config.paths.src, '/index.html'),
  styles: path.join(config.paths.app, '/index.scss'),
};

module.exports = config;
