/* eslint-env node */

'use strict';

var fs = require('fs');

/**
 * Directory containing gulp tasks.
 * @type {string}
 */
var gulpDir = './gulp';

// Read gulp directory and require all JavaScript files.
fs.readdirSync(gulpDir).
  filter(function(file) {
    return (/\.js$/i).test(file);
  }).
  map(function(file) {
    require('./gulp/' + file);
  });
