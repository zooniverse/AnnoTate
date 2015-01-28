(function () {

    'use strict';

    var app = angular.module('app');

    app.constant('Config', {
        svg: {
            pointSize: 10
        },
        api: 'https://panoptes-staging.zooniverse.org/api',
        apiParams: {
            'project_id': 185,
            'workflow_id': 141
        }
    });

    app.config([
        '$sceDelegateProvider',
        function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'http://static.zooniverse.org/**',
                'https://panoptes-uploads.zooniverse.org/**'
            ]);

    }]);

}());
