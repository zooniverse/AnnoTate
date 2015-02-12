(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify', ['firebase']);

    module.constant('Config', {
        firebase: {
            api: 'https://transcribe.firebaseIO.com'
        }
    });

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
