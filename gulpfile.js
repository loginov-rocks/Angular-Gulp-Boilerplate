/* eslint-env node */
'use strict';

const fs = require('fs');

/**
 * Directory containing Gulp tasks.
 * @type {string}
 */
const gulpDir = './gulp/';

// Read Gulp directory and require all JavaScript files.
fs.readdirSync(gulpDir).
    filter((file) => (/\.js$/i).test(file)).
    map((file) => {
      require(gulpDir + file);
    });
