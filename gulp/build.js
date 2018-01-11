'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');
var path = require('path');

var config = require('./config');

/**
 * Build production version ready to deploy.
 * @gulpTask build
 */
gulp.task('build', ['build-app', 'fonts', 'locales:dist', 'other']);

/**
 * Build production version of app only, without assets.
 * @gulpTask build-app
 * @TODO: Fix using `rev`, `revReplace` and error handling for `uglify`.
 */
gulp.task('build-app', ['inject', 'partials'], function() {
  var injectPartials = gulp.src(
    path.join(config.paths.partials, '/', config.templatecache.filename),
    {read: false}
  );

  var injectOptions = {
    addRootSlash: false,
    ignorePath: config.paths.partials,
    starttag: '<!-- inject:partials -->',
  };

  var htmlPipe = lazypipe().
    //pipe($.revReplace).
    pipe($.htmlmin, config.htmlmin);

  var scriptsPipe = lazypipe().
    //pipe($.rev).
    pipe($.sourcemaps.init).
    pipe($.ngAnnotate).
    pipe($.uglify, {output: {comments: 'some'}}).
    //on('error', config.errorHandler('Uglify')).
    pipe($.sourcemaps.write, 'maps');

  var stylesPipe = lazypipe().
    //pipe($.rev).
    pipe($.sourcemaps.init).
    pipe($.cssnano, {zindex: false}).
    pipe($.sourcemaps.write, 'maps');

  return gulp.src(path.join(config.paths.tmp, '/serve/*.html')).
    pipe($.inject(injectPartials, injectOptions)).
    pipe($.useref()).
    pipe($.if('*.html', htmlPipe())).
    pipe($.if('**/*.js', scriptsPipe())).
    pipe($.if('**/*.css', stylesPipe())).
    pipe(gulp.dest(config.paths.dist)).
    pipe($.size({showFiles: true, title: 'build-app'}));
});
