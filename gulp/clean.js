'use strict';

var config = require('./config');

var del = require('del');
var gulp = require('gulp');
var path = require('path');

gulp.task('clean', function () {
    return del([path.join(config.paths.dist, '/'), path.join(config.paths.tmp, '/')]);
});
