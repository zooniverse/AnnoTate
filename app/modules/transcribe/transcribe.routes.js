'use strict';

require('./transcribe.module.js')
    .config(Routes);

/**
 * @ngInject
 */
function Routes($stateProvider) {

    $stateProvider
        .state('Transcribe', {
            url: '/transcribe',
            title: 'Transcribe',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'transcribe/transcribe.html',
                    controller: 'TranscribeCtrl as vm'
                }
            }
        });

}
