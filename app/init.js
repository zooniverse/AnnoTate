(function (angular) {

    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'cfp.hotkeys',
        'ngLoad',
        'ngStorage'
    ]);

    app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeCtrl',
                    slug: 'home',
                    templateUrl: 'pages/home.html',
                    resolve: {
                        'Auth': ['$rootScope', 'AuthFactory', function ($rootScope, Auth) {
                            $rootScope.Auth = Auth;
                        }]
                    }
                })
                .when('/about', {
                    slug: 'about',
                    templateUrl: 'pages/about.html',
                    resolve: {
                        'Auth': ['$rootScope', 'AuthFactory', function ($rootScope, Auth) {
                            $rootScope.Auth = Auth;
                        }]
                    }
                })
                .when('/classify', {
                    controller: 'ClassifyCtrl',
                    slug: 'classify',
                    templateUrl: 'pages/classify.html',
                    resolve: {
                        'Auth': ['$rootScope', 'AuthFactory', function ($rootScope, Auth) {
                            $rootScope.Auth = Auth;
                        }]
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

    app.run([
        '$rootScope',
        'AuthFactory',
        function ($rootScope, Auth) {
            $rootScope.$on('$routeChangeSuccess', function (event, data) {
                $rootScope.slug = data.$$route.slug  || '';
            });
        }
    ]);

}(window.angular));
