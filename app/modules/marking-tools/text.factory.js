'use strict';

require('./marking-tools.module.js')
    .factory('textTool', textTool);

/**
 * @ngInject
 */
function textTool(Annotations, toolUtils) {

    var factory;
    var _svg;
    var _subject;
    var _startPoint;

    factory = {
        name: 'text',
        activate: activate,
        deactivate: deactivate
    }

    return factory;

    function activate(svg) {
        _svg = svg;
        _subject = svg.find('.subject');
        _subject.on('mousedown.text', _clickHandler);
    }

    function deactivate() {
        _subject.off('.text');
    }

    function _clickHandler(event) {
        _subject.on('mouseup.text mousemove.text', clickOrDrag);
        function clickOrDrag(event) {
            if (event.type === 'mouseup') {
                if (!_startPoint) {
                   _addStartPoint(event);
                } else {
                    _addAnnotation(event);
                    _removeStartPoint();
                }
            }
            _subject.off('mouseup.text mousemove.text', clickOrDrag);
        }
    }

    function _addStartPoint(event) {
        console.log(toolUtils.getPoint(_svg, event))
    }

    function _addAnnotation() {

    }

    function _removeStartPoint(event) {
        console.log('remove')
    }

}
