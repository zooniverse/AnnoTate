'use strict';

require('./marking-tools.module.js')
    .factory('textTool', textTool);

/**
 * @ngInject
 */
function textTool() {

    var factory;

    factory = {
        name: 'text',
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
