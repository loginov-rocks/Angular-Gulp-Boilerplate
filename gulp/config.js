'use strict';

var gulpUtil = require('gulp-util');

exports.mainAngularModule = 'app';

exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
};

exports.wiredep = {
  directory: 'bower_components',
};

exports.sass = {
  excludeUnderscored: false,
  options: {
    outputStyle: 'expanded',
    precision: 10,
  },
};

exports.htmlminOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
};

exports.locales = {
  directory: 'locales',
  angular: {
    directory: 'bower_components/angular-i18n',
    used: [
      'en',
      'ru',
    ],
  },
};

exports.errorHandler = function(title) {
  return function(err) {
    gulpUtil.log(gulpUtil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
