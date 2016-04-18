# Change Log
All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

## [3.2.0] - 15 April 2016
### Changed
- `panoptes-client` bumped to latest version
- Auth system rewritten to use the OAuth module
- Gulpfile made more consistent
- Deploy targets made more consistent with Zoo naming convention

## [3.1.0]
### Added
- S3 upload util, and production, preview and alpha deploy targets

### Changed
- Fixed dependency injection in app config
- Misc formatting, cosmetic tweaks
- Artist subject sets are now retrieved by metadata filtering on artistId, not grabbing all of the sets
- Login flow swapped for OAuth
- Signing out now closes the Panoptes session as well
- ...lots more, have a look at the git log.

## [1.0.0] - 11 May 2015
### Added
- Project rebuilt from [ng-davai](https://github.com/rogerhutchings/ng-davai); check the git history for changes up to this point
- This CHANGELOG
- Licence
