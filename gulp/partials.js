'use strict';

var config = require('./config');

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var path = require('path');

gulp.task('partials', function () {
    return gulp.src([
        path.join(config.paths.src, '/app/**/*.html'),
        path.join(config.paths.tmp, '/serve/app/**/*.html')
    ])
        .pipe($.htmlmin(config.htmlminOptions))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: config.mainAngularModule,
            root: 'app'
        }))
        .pipe(gulp.dest(config.paths.tmp + '/partials/'));
});
