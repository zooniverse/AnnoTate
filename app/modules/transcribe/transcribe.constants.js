'use strict';

require('./transcribe.module.js')
    .constant('TranscribeConstants', {
        modals: {
            next: {
                templateUrl: 'transcribe/transcribe-next.html',
                controller: 'TranscribeNextController',
                controllerAs: 'vm',
                size: 'md',
                backdrop: 'static'
            }
        }
    });
