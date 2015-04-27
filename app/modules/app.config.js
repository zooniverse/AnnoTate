'use strict';

var appConfig = {
    appTitle: 'ng-davai'
};

/**
 * @ngInject
 */
function routes($locationProvider) {
    $locationProvider.html5Mode(true);
}

module.exports = {
    constants: appConfig,
    routes: routes
};
