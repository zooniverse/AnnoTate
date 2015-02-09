(function () {

    'use strict';

    var module = angular.module('transcribe');

    module.constant('Config', {
        svg: {
            pointSize: 10
        },
        api: 'https://panoptes-staging.zooniverse.org/api',
        apiParams: {
            'project_id': 6
        }
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

}());
