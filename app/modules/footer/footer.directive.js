'use strict';

require('./footer.module.js')
    .directive('appFooter', appFooter);

/**
 * @ngInject
 */
function appFooter() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'footer/footer.html',
    };
}
