'use strict';

var _ = require('lodash');

require('./marking-tools.module.js')
    .factory('imageTool', imageTool);

/**
 * @ngInject
 */
function imageTool($rootScope, Annotations, toolUtils) {

    var factory;
    var _origin;
    var _rectangle;
    var _svg;
    var _subject;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate(svg) {
        _svg = svg;
        _subject = svg.find('.pan-zoom');
        _subject.on('mousedown.image', _clickHandler);
        _origin = null;
        _rectangle = null;
    }

    function deactivate() {
        _subject.off('.image');
        _clearRect();
    }

    function _clickHandler(event) {
        _subject.on('mouseup.image mousemove.image', clickOrDrag);
        function clickOrDrag(event) {
            if (event.type === 'mouseup')
                (!_rectangle) ? _startRect(event) : _endRect(event);
            _subject.off('mouseup.image mousemove.image', clickOrDrag);
        }
    }

    function _startRect() {
        _origin = toolUtils.getPoint(_svg, event);
        _rectangle = Annotations.add(_.extend({}, _origin, {
            type: 'tempImage',
            width: 0,
            height: 0,
            temp: true
        }));
        _subject.on('mousemove.image', _drawRect);
    }

    function _drawRect() {
        var newPoint = toolUtils.getPoint(_svg, event);
        _rectangle.x = (_origin.x < newPoint.x) ? _origin.x : newPoint.x;
        _rectangle.y = (_origin.y < newPoint.y) ? _origin.y : newPoint.y;
        _rectangle.width = (_origin.x < newPoint.x) ? newPoint.x - _rectangle.x : _origin.x - newPoint.x;
        _rectangle.height = (_origin.y < newPoint.y) ? newPoint.y - _rectangle.y : _origin.y - newPoint.y;
        $rootScope.$apply();
    }

    function _endRect() {
        _subject.off('mousemove.image', _drawRect);
        Annotations.add(_.extend({}, _rectangle, {
            type: 'image',
            temp: false
        }));
        _clearRect();
        $rootScope.$apply();
    }

    function _clearRect() {
        Annotations.destroy(_rectangle);
        _origin = null;
        _rectangle = null;
    }

}
