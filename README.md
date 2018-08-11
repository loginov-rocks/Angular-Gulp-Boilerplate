# Angular Gulp Boilerplate

[![NpmVersion](https://img.shields.io/npm/v/angular-gulp-boilerplate.svg)](https://www.npmjs.com/package/angular-gulp-boilerplate)
[![Build Status](https://travis-ci.org/1oginov/Angular-Gulp-Boilerplate.svg?branch=master)](https://travis-ci.org/1oginov/Angular-Gulp-Boilerplate)
[![devDependencies Status](https://david-dm.org/1oginov/Angular-Gulp-Boilerplate/dev-status.svg)](https://david-dm.org/1oginov/Angular-Gulp-Boilerplate?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/1oginov/Angular-Gulp-Boilerplate.svg)](https://greenkeeper.io/)

Clean AngularJS boilerplate powered by Gulp tasks and designed to automate your daily development routine such as
concatenation, obfuscation, minimisation and injection of templates, scripts, styles, translations and more.

As a result of using this boilerplate, your entire AngularJS project will be delivered to end users in a small bunch of
files: `index.html`, scripts and styles split to app-related and vendor-related, translations and source maps.

![Teaser](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/teaser.png)

## What you will get?

[![AngularJS](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/angular.png)](https://angularjs.org)
[![npm](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/npm.png)](https://www.npmjs.com)
[![Gulp](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/gulp.png)](https://gulpjs.com)
[![Bower](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/bower.png)](https://bower.io)
[![Browsersync](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/browsersync.png)](https://browsersync.io)
[![Babel](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/babel.png)](https://babeljs.io)
[![ESLint](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/eslint.png)](https://eslint.org)
[![Sass](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/sass.png)](https://sass-lang.com)
[![Autoprefixer](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/autoprefixer.png)](https://autoprefixer.github.io)
[![Normalize.css](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/normalize.png)](https://necolas.github.io/normalize.css)
[![UI-Router](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/ui-router.png)](https://ui-router.github.io)
[![angular-translate](https://raw.githubusercontent.com/1oginov/Angular-Gulp-Boilerplate/master/github/angular-translate.png)](https://angular-translate.github.io)

[AngularJS](https://angularjs.org) with [UI-Router](https://ui-router.github.io) to manage routing, preconfigured
[angular-translate](https://angular-translate.github.io) and helper packages to implement native dynamic localization
and internationalization in a component-based approach, [ng-annotate](https://www.npmjs.com/package/ng-annotate) to add
dependency injection annotations, [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache) to
encapsulate HTML templates in the app JavaScript bundle.

[Bower](https://bower.io) with [Wiredep](https://www.npmjs.com/package/wiredep) to automate vendor dependencies
injecting into the app scripts and styles.

A bunch of [Gulp](https://gulpjs.com) tasks to manage templates, scripts, styles, assets, translations, source maps, and
to prepare the app for production deployment.

[Browsersync](https://browsersync.io) for live reloading and synchronised testing across browsers and devices.

[Babel](https://babeljs.io) to transpile ES2015 and beyond to vanilla JavaScript.

[ESLint](https://eslint.org) with AngularJS [plugin](https://www.npmjs.com/package/eslint-plugin-angular) to lint your
code online and keep it clean.

[Sass](https://sass-lang.com) compiler with [Autoprefixer](https://autoprefixer.github.io) and
[Normalize.css](https://necolas.github.io/normalize.css).

## Quick start

Boilerplate exists in **Node.js** environment, so you need to install Node.js from
[official website](https://nodejs.org) or use [NVM](https://github.com/creationix/nvm)
([NVM for Windows](https://github.com/coreybutler/nvm-windows)) first.   

After setting up Node.js you can use **npm** ([Yarn](https://yarnpkg.com) is an alternative) to install
[Bower](https://bower.io) and [Gulp](https://gulpjs.com) globally:

```sh
npm install -g bower gulp-cli
```

### Install

Clone repository from GitHub:

```sh
git clone https://github.com/1oginov/Angular-Gulp-Boilerplate.git MyProject
```

Jump into `MyProject` directory and install dependencies from npm registry:

```sh
cd MyProject
npm install
```

Next, install dependencies from Bower registry:

```sh
bower install
```

And that's it!

### Use

Execute Gulp serving task to check if everything is fine:

```sh
gulp serve
```

Your default browser will be launched at `http://localhost:3000` serving project. See other Gulp tasks and npm scripts
you can use below.

### Global install

Alternatively, you can delegate repository cloning to the package itself. Just install it globally as with Bower and
Gulp:

```sh
npm install -g angular-gulp-boilerplate
```

Having this package installed globally, you can use the following command to clone the repository into your current
directory:

```sh
angular-gulp-boilerplate
```

Or you can specify directory name to clone into as an argument:

```sh
angular-gulp-boilerplate MyProject
```

This command checks out the same version as you have installed globally. So if a new version is released, you can update
package with the following command:

```sh
npm update -g angular-gulp-boilerplate
```

## Gulp tasks

### Most used

* `gulp serve` or `npm start` - Build project, start watching for all changes and serve it using Browsersync.
* `gulp default` or `npm run build` - Clean used directories and build production version ready to deploy.

### Other

* `gulp build` - Build production version ready to deploy.
* `gulp build-app` - Build production version of app only, without assets.
* `gulp clean` - Clean distribution and temporary directories.
* `gulp fonts` - Copy and flatten fonts from Bower packages to distribution dir.
* `gulp inject` - Inject scripts and styles into HTML entry.
* `gulp inject:reload` - Start `inject` task and launch Browsersync reloading after.
* `gulp locales` - Build locales.
* `gulp locales-angular` - Build Angular locales only.
* `gulp locales-angular:dist` - Build Angular locales only to distribution dir.
* `gulp locales:dist` - Build locales to distribution dir.
* `gulp locales:watch` - Build locales and watch for changes.
* `gulp other` - Copy various not handled stuff to distribution dir.
* `gulp partials` - Create template cache from HTML partials.
* `gulp scripts` - Build scripts.
* `gulp scripts:clean` - Clean temporary scripts.
* `gulp scripts:watch` - Build scripts and watch for changes.
* `gulp serve:dist` or `npm run start:dist` - Build production version and serve it using Browsersync.
* `gulp styles` - Build styles.
* `gulp styles:watch` - Build styles and watch for changes.
* `gulp watch` - Build project and watch for all changes.

## Npm scripts

npm scripts are not related to the development flow itself, but can be helpful to keep your project up to date.

* `npm run docs:gulp` - Make markdown file containing Gulp tasks description as in the list above.
* `npm run lint` - Lint JavaScript files.
* `npm run update:bower` - Update dependencies versions in `bower.json` to the latest.
* `npm run update:dev` - Update dependencies versions in `package.json` to the latest.

After updating dependencies versions you actually need to install them, do it with the following commands:

```sh
bower install
npm install
```

## Contribution

Please use the [dev](https://github.com/1oginov/Angular-Gulp-Boilerplate/tree/dev) branch and feel free to contribute!

## Credits

Awesome [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular) was used as a basis for this project,
especially Gulp tasks. This generator is unmaintained for a long time, I refactored it, implemented new features and try
to keep all dependencies up to date, since it's used in my own production projects.
