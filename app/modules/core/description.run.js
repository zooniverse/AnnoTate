'use strict';

require('./core.module.js')
    .run(setPageDescription);

// @ngInject
function setPageDescription($rootScope, appConfig) {
    $rootScope.pageDescription =  appConfig.appDescription;
}
