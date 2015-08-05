'use strict';

require('./footer.module.js')
    .directive('appFooter', appFooter);

// @ngInject
function appFooter($state, FooterLinkConstants) {
    var directive = {
        link: appFooterLink,
        restrict: 'A',
        replace: true,
        templateUrl: 'footer/footer.html',
        transclude: true
    };
    return directive;

    function appFooterLink(scope) {
        scope.links = FooterLinkConstants;

        scope.$watch(function () {
            return $state.current.params;
        }, function (params) {
            scope.smallFooter = (params && params.smallFooter) ? true : false;
        });
    }
}



