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
        talk: {
            templateUrl: 'modals/talk.html',
            controller: 'TalkController',
            controllerAs: 'vm',
            size: 'md',
            windowClass: 'talk-modal'
        },
        tutorial: {
            templateUrl: 'modals/tutorial.html',
            controller: 'TutorialController',
            controllerAs: 'vm',
            size: 'md',
            windowClass: 'tutorial-modal'
        }
    });
