'use strict';

const gulpUtil = require('gulp-util');

/**
 * Simple error logger.
 * @param {string} title
 * @return {Function}
 */
const errorHandler = (title) => ((err) => {
  gulpUtil.log(gulpUtil.colors.red('[' + title + ']'), err.toString());
  this.emit('end');
});

module.exports = {
  errorHandler,
};
