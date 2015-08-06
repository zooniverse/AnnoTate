'use strict';

require('./modals.module.js')
    .factory('ModalsFactory', ModalsFactory);

// @ngInject
function ModalsFactory($modal, ModalsConstants) {

    var factory;

    factory = {
        openNext: openNext,
        openTutorial: openTutorial
    };

    return factory;

    function openNext() {
        return $modal.open(ModalsConstants.next);
    }

    function openTutorial() {
        return $modal.open(ModalsConstants.tutorial);
    }

}
