(function (angular) {

    'use strict';

    var module = angular.module('transcribe.static', []);

    module.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'static/templates/pages/home.html',
                    slug: 'home'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'static/templates/pages/about.html',
                    slug: 'about'
                });
        }
    ]);

}(window.angular));
