'use strict';

require('./core.module.js')
    .run(setPageTitle);

// @ngInject
function setPageTitle($rootScope, appConfig) {

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = '';

        if (toState.title) {
            $rootScope.pageTitle += toState.title;
            $rootScope.pageTitle += ' \u2014 ';
        }

        $rootScope.pageTitle += appConfig.appTitle;
    });

}
