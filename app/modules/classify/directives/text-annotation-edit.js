(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.directive('textAnnotationEdit', [
        '$window',
        'AnnotationsFactory',
        function ($window, Annotations) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'classify/templates/directives/text-annotation-edit.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent.$parent;
                    var viewport = element.parent();
                    var textArea = element.find('textarea');

                    scope.translateX = (viewport[0].clientWidth - 400) / 2;
                    scope.translateY = (viewport[0].clientHeight - 169) / 2;
                    scope.text = scope.data.text || '';
                    element.css('transform', 'translateX(' + scope.translateX + 'px) translateY(' + scope.translateY + 'px)');

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

                        textArea[0].focus();

                    };


                    var draggie = new Draggabilly(element[0], {
                        containment: true
                    });

                    scope.deletion = function ($event) {
                        tag('deletion');
                    };

                    scope.insertion = function ($event) {
                        tag('insertion');
                    };

                    scope.illegible = function ($event) {
                        tag('illegible');
                    };

                    scope.foreign = function ($event) {
                        tag('foreign');
                    };

                    scope.close = function () {
                        ClassifyCtrl.editingTextAnnotation = null;
                    };

                    scope.save = function () {
                        scope.data.text = scope.text;
                        scope.close();
                    };

                    scope.delete = function () {
                        Annotations.destroy(scope.data);
                        scope.close();
                    };

                }
            }
        }
    ]);

}(window.angular));
