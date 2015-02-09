(function (angular) {

    'use strict';

    var app = angular.module('transcribe.static', []);

    app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    slug: 'home',
                    templateUrl: 'static/templates/pages/home.html'
                })
                .when('/about', {
                    slug: 'about',
                    templateUrl: 'static/templates/pages/about.html'
                });
    }]);

}(window.angular));
