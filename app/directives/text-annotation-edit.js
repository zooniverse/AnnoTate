(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('textAnnotationEdit', [
        '$window',
        function ($window) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/text-annotation-edit.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent.$parent;
                    var textArea = element.find('textarea');

                    scope.text = scope.data.text || '';

                    var tag = function (tagText) {

                        var startTag = '[' + tagText + ']';
                        var endTag = '[/' + tagText + ']';

                        var start = textArea.prop('selectionStart');
                        var end = textArea.prop('selectionEnd');
                        var text = textArea.val();

                        if (start === end) {
                            var textBefore = text.substring(0, start);
                            var textAfter = text.substring(start, text.length);
                            textArea.val(textBefore + startTag + endTag + textAfter);
                        } else {
                            var textBefore = text.substring(0, start);
                            var textInBetween = text.substring(start, end);
                            var textAfter = text.substring(end, text.length);
                            textArea.val(textBefore + startTag + textInBetween + endTag + textAfter);
                        }

                    };

                    scope.deletion = function () {
                        tag('deletion');
                    };

                    scope.insertion = function () {
                        tag('insertion');
                    };

                    scope.illegible = function () {
                        tag('illegible');
                    };

                    scope.close = function () {
                        ClassifyCtrl.editingTextAnnotation = null;
                    };

                    scope.save = function () {
                        scope.data.text = scope.text;
                        scope.close();
                    };

                }
            }
        }
    ]);

}(window.angular));
