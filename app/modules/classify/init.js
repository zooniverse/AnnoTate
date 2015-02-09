(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify', []);

    module.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('classify', {
                    url: '/classify',
                    templateUrl: 'classify/templates/classify.html',
                    controller: 'ClassifyCtrl',
                    slug: 'classify'
                });
        }
    ]);

}(window.angular));
