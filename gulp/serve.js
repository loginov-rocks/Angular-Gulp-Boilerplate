'use strict';

var config = require('./config');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var gulp = require('gulp');
var path = require('path');
var util = require('util');

gulp.task('serve', ['watch'], function() {
  browserSyncInit([path.join(config.paths.tmp, '/serve'), config.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(config.paths.dist);
});

browserSync.use(browserSyncSpa({
  selector: '[ng-app]',
}));

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === config.paths.src ||
      (util.isArray(baseDir) && baseDir.indexOf(config.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
  };

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
  });
}
