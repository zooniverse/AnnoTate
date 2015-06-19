'use strict';

require('./modals.module.js')
    .factory('ModalsFactory', ModalsFactory);

// @ngInject
function ModalsFactory($modal, ModalsConstants) {

    var factory;

    factory = {
        openNext: openNext,
    };

    return factory;

    function openNext() {
        return $modal.open(ModalsConstants.next);
    }

}
