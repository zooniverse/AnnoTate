'use strict';

require('./modals.module.js')
    .factory('ModalsFactory', ModalsFactory);

// @ngInject
function ModalsFactory($modal, ModalsConstants) {

    var factory;

    factory = {
        openNext: openNext,
        openSignIn: openSignIn,
        openTutorial: openTutorial,
        openTalk: openTalk
    };

    return factory;

    function openNext() {
        return $modal.open(ModalsConstants.next);
    }

    function openSignIn() {
        return $modal.open(ModalsConstants.signIn);
    }

    function openTalk() {
        return $modal.open(ModalsConstants.talk);
    }

    function openTutorial() {
        return $modal.open(ModalsConstants.tutorial);
    }

}
