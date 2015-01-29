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
                    templateUrl: 'pages/home.html'
                })
                .when('/about', {
                    slug: 'about',
                    templateUrl: 'pages/about.html'
                })
                .when('/classify', {
                    controller: 'ClassifyCtrl',
                    slug: 'classify',
                    templateUrl: 'pages/classify.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

    app.run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, data) {
                $rootScope.slug = data.$$route.slug  || '';
            });
        }
    ]);

}(window.angular));
