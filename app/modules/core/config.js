(function () {

    'use strict';

    var module = angular.module('transcribe');

    module.constant('Config', {
        svg: {
            pointSize: 10
        },
        projectName: 'AnnoTate'
    });

    module.config([
        '$sceDelegateProvider',
        function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'http://static.zooniverse.org/**',
                'https://panoptes-uploads.zooniverse.org/**'
            ]);

    }]);

    module.config([
        'Config',
        'localStorageServiceProvider',
        function (Config, localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix(Config.projectName);
        }
    ]);

}());
