'use strict';

require('./transcribe.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/classify', '/transcribe');

    $stateProvider
        .state('TranscribeSubjectSet', {
            url: '/transcribe/:subjectSet',
            title: 'Transcribe',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'transcribe/transcribe.html',
                    controller: 'TranscribeController as vm'
                }
            },
            params: {
                hideHook: true,
                smallFooter: true
            }
        })
        .state('Transcribe', {
            url: '/transcribe',
            title: 'Transcribe',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'transcribe/transcribe.html',
                    controller: 'TranscribeController as vm'
                }
            },
            params: {
                hideHook: true,
                smallFooter: true
            }
        });
}
