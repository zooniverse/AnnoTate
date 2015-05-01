'use strict';

require('./marking-tools.module.js')
    .factory('imageTool', imageTool);

/**
 * @ngInject
 */
function imageTool() {

    var factory;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    }

    return factory;

    function activate() {
        console.log('activate', this.name);
    }

    function deactivate() {
        console.log('deactivate');
    }

}
