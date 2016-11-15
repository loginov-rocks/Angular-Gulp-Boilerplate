'use strict';

var config = require('./config');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');

gulp.task('scripts', function () {
    return buildScripts();
});

gulp.task('scripts-reload', function () {
    return buildScripts()
        .pipe(browserSync.stream());
});

function buildScripts() {
    return gulp.src(path.join(config.paths.src, '/app/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.size());
}
