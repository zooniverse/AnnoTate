'use strict';

require('./modals.module.js')
    .constant('ModalsConstants', {
        next: {
            templateUrl: 'modals/transcribe-next.html',
            controller: 'TranscribeNextController',
            controllerAs: 'vm',
            size: 'md',
            backdrop: 'static',
            windowClass: 'next-modal'
        },
        tutorial: {
            templateUrl: 'modals/tutorial.html',
            controller: 'TutorialController',
            controllerAs: 'vm',
            size: 'lg',
            windowClass: 'tutorial-modal'
        }
    });
