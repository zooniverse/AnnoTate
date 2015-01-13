(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('textAnnotationEdit', [
        function () {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/text-annotation-edit.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent.$parent;

                    scope.deletion = function () {
                        console.log('deletion');
                    };

                    scope.insertion = function () {
                        console.log('insertion');
                    };

                    scope.illegible = function () {
                        console.log('illegible');
                    };

                    scope.discard = function () {
                        console.log('Discard');
                        ClassifyCtrl.editingTextAnnotation = null;
                    };

                    scope.save = function () {
                        console.log('save');
                    };

                }
            }
        }
    ]);

}(window.angular));
