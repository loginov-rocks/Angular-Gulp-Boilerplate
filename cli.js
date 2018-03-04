#!/usr/bin/env node
/* eslint-env node */
'use strict';

var gitClone = require('git-clone');

var packageJson = require('./package.json');

var repository = packageJson.repository.url;
repository = repository.substring(repository.indexOf('https://'));

var tag = 'v' + packageJson.version;

var destination = process.argv[2] || './';

process.stdout.write('Cloning Git repository from ' + repository + ' to "' +
    destination + '" using ' + tag + '...');

gitClone(repository, destination, {checkout: tag}, function() {
  process.stdout.write(' done!\n');
});
