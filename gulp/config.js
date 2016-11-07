'use strict';

var gutil = require('gulp-util');

exports.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp'
};

exports.wiredep = {
    directory: 'bower_components'
};

exports.errorHandler = function (title) {
    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
