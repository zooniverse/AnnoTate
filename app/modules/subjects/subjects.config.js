'use strict';

require('./subjects.module.js')
    .config(setWhiteList);

// @ngInject
function setWhiteList($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://static.zooniverse.org/**',
        'https://panoptes-uploads.zooniverse.org/**'
    ]);
}
