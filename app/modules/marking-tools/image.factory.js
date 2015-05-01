'use strict';

require('./marking-tools.module.js')
    .factory('imageTool', imageTool);

/**
 * @ngInject
 */
function imageTool() {

    var factory;
    var _svg;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate(svg) {
        _svg = svg;
        console.log('activate', this.name, _svg);
    }

    function deactivate() {
        console.log('deactivate');
    }

}
