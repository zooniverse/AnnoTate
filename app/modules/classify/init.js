(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify', []);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/classify', {
                    controller: 'ClassifyCtrl',
                    slug: 'classify',
                    templateUrl: 'classify/templates/classify.html',
                    resolve: {
                        'Auth': ['$rootScope', 'AuthFactory', function ($rootScope, Auth) {
                            $rootScope.Auth = Auth;
                        }]
                    }
                });
    }]);

}(window.angular));
