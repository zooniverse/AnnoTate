'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

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
        _panzoom = new Hammer(svg.find('.pan-zoom')[0]);
        _panzoom.on('tap', _clickHandler);
        _annotation = null;
    }

    function deactivate() {
        if (_annotation) {
            Annotations.destroy(_annotation);
            _annotation = null;
        }
        _panzoom.off('tap');
    }

    function _allowedTarget(event) {
        var element = angular.element(event.target);
        return element.parents('.text-annotation').length === 0;

    }

    function _clickHandler(event) {
        if (_allowedTarget(event)) {
            if (!_annotation) {
                _startLine(event);
            } else {
                _endLine(event);
            }
        }
    }

    function _getPoint(event) {
        return toolUtils.getPoint(_svg, event.srcEvent);
    }

    function _startLine(event) {
        var point = _getPoint(event);
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
        var point = _getPoint(event);
        Annotations.upsert(_.extend(_annotation, {
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
