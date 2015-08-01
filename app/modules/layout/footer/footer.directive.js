'use strict';

require('./footer.module.js')
    .directive('appFooter', appFooter);

// @ngInject
function appFooter(FooterLinkConstants) {
    var directive = {
        link: appFooterLink,
        restrict: 'A',
        replace: true,
        templateUrl: 'footer/footer.html',
    };
    return directive;

    function appFooterLink(scope) {
        scope.links = FooterLinkConstants;
    }
}
