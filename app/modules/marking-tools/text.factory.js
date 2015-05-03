'use strict';

var _ = require('lodash');

require('./marking-tools.module.js')
    .factory('textTool', textTool);

/**
 * @ngInject
 */
function textTool($rootScope, Annotations, toolUtils) {

    var factory;
    var _annotation;
    var _panzoom;
    var _svg;

    factory = {
        name: 'text',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate(svg) {
        _svg = svg;
        _panzoom = svg.find('.pan-zoom');
        _panzoom.on('mousedown.text', _clickHandler);
        _annotation = null;
    }

    function deactivate() {
        if (_annotation) {
            Annotations.destroy(_annotation);
            _annotation = null;
        }
        _panzoom.off('.text');
    }

    function _allowedTarget(event) {
        var element = angular.element(event.target);
        return element.parents('.text-annotation').length === 0;

    }

    function _clickHandler() {
        var events = 'mouseup.text mousemove.text';
        _panzoom.on(events, clickOrDrag);
        function clickOrDrag(event) {
            if (event.type === 'mouseup' && _allowedTarget(event)) {
                if (!_annotation) {
                    _startLine(event);
                } else {
                    _endLine(event);
                }
            }
            _panzoom.off(events, clickOrDrag);
        }
    }

    function _startLine(event) {
        var point = toolUtils.getPoint(_svg, event);
        _annotation = Annotations.upsert({
            type: 'text',
            complete: false,
            startPoint: {
                x: point.x,
                y: point.y
            }
        });
        $rootScope.$apply();
    }

    function _endLine(event) {
        var point = toolUtils.getPoint(_svg, event);
        _annotation = Annotations.upsert(_.extend(_annotation, {
            complete: true,
            endPoint: {
                x: point.x,
                y: point.y
            }
        }));
        _annotation = null;
        $rootScope.$apply();
    }

}
