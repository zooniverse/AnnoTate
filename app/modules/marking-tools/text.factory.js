'use strict';

var _ = require('lodash');

require('./marking-tools.module.js')
    .factory('textTool', textTool);

/**
 * @ngInject
 */
function textTool($rootScope, Annotations, toolUtils) {

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
        _subject = svg.find('.pan-zoom');
        _subject.on('mousedown.text', _clickHandler);
        _startPoint = null;
    }

    function deactivate() {
        if (_startPoint)
            _clearStartPoint();
        _subject.off('.text');
    }

    function _clickHandler(event) {
        _subject.on('mouseup.text mousemove.text', clickOrDrag);
        function clickOrDrag(event) {
            if (event.type === 'mouseup')
                (!_startPoint) ? _startLine(event) : _endLine(event);
            _subject.off('mouseup.text mousemove.text', clickOrDrag);
        }
    }

    function _startLine(event) {
        var point = toolUtils.getPoint(_svg, event);
        _startPoint = Annotations.add(_.extend({}, point, {
            type: 'tempText',
            temp: true
        }));
        $rootScope.$apply();
    }

    function _endLine(event) {
        var endPoint = toolUtils.getPoint(_svg, event);
        Annotations.add({
            type: 'text',
            x1: _startPoint.x,
            y1: _startPoint.y,
            x2: endPoint.x,
            y2: endPoint.y
        });
        _clearStartPoint();
        $rootScope.$apply();
    }

    function _clearStartPoint() {
        Annotations.destroy(_startPoint);
        _startPoint = null;
    }

}
