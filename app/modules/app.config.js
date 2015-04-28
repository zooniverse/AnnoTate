'use strict';

var appConfig = {
    appTitle: 'AnnoTate',
    appDescription: 'Help the Tate discover the lives of twentieth-century artists by transcribing their letters, diaries and sketchbooks.'
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
