'use strict';

require('./marking-tools.module.js')
    .factory('textTool', textTool);

/**
 * @ngInject
 */
function textTool(Annotations) {

    var factory;
    var _svg;

    factory = {
        name: 'text',
        activate: activate,
        deactivate: deactivate
    }

    return factory;

    function activate(svg) {
        _svg = svg;
        _svg.on('mousedown.text', _clickHandler);
    }

    function deactivate() {
        _svg.off('.text');
    }

    function _clickHandler(event) {
        _svg.on('mouseup.text mousemove.text', clickOrDrag);
        function clickOrDrag(event) {
            if (event.type === 'mouseup') {
                console.log('click');
            } else {
                console.log('drag');
            }
            _svg.off('mouseup.text mousemove.text', clickOrDrag);
        }
    }

}
