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

                    scope.text = scope.data.text || '';

                    scope.deletion = function () {
                        console.log('deletion');
                    };

                    scope.insertion = function () {
                        console.log('insertion');
                    };

                    scope.illegible = function () {
                        console.log('illegible');
                    };

                    scope.close = function () {
                        console.log('Close');
                        ClassifyCtrl.editingTextAnnotation = null;
                    };

                    scope.save = function () {
                        scope.data.text = scope.text;
                        console.log('save', scope.data);
                        scope.close();
                    };

                }
            }
        }
    ]);

}(window.angular));
