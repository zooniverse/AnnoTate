# Change Log
All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.0] - 27 April 2015
### Added
- 404 module

### Changed
- Ensure production task finishes views before running browserify

## [1.0.0] - 26 April 2015
### Added
- Nib, Bootstrap to styles task
- Bootstrap import and variables overrides in Stylus
- Glyphicons to repo
- Demo module to show new module pattern

### Changed
- Now uses a module pattern for script files
- Templates are compiled into their own module
- Moved config options to app.module.js

### Removed
- Old scripts from [jakemmarsh/angularjs-gulp-browserify-boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) have been taken out

## [0.1.0] - 15 April 2015
### Added
- Gulp-stylus and sourcemaps plugins
- Stylus files converted from original SCSS

### Changed
- Gulp styles task now compiles Stylus files via `main.styl`, and watches all `.styl` files

### Removed
- Old scss files

## [0.0.1] - 15 April 2015
### Added
- Files from [jakemmarsh/angularjs-gulp-browserify-boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate)
- This CHANGELOG

### Changed
- Updated package.json to reflect new project
- Updated README
