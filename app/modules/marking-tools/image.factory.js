'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./marking-tools.module.js')
    .factory('imageTool', imageTool);

/**
 * @ngInject
 */
function imageTool($document, $rootScope, $timeout, Annotations, toolUtils) {

    $rootScope.$on('openContextMenu', _disable);
    $rootScope.$on('closeContextMenu', _enable);

    var factory;
    var _enabled;
    var _origin;
    var _panzoom;
    var _rect;
    var _svg;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    };

    return factory;


    function activate(svg) {
        _svg = svg;

        if (_.isUndefined(_rect)) {
            _rect = angular.element(document.createElementNS(_svg[0].namespaceURI, 'rect'))
                .attr('class', 'image-annotation -temp')
                .appendTo(svg.find('.image-annotations').first())
        }

        _panzoom = new Hammer(svg.find('.pan-zoom')[0]);
        _panzoom.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        _panzoom.on('panstart', _startRect);
        _panzoom.on('panend', _endRect);
        $rootScope.$broadcast('enableImageTool');
        _enabled = true;
    }

    function deactivate() {
        $rootScope.$broadcast('disableImageTool');
        _panzoom.off('panstart', _startRect);
        _panzoom.off('panend', _endRect);
    }

    function _disable() {
        _enabled = false;
    }

    function _drawRect(event) {
        var newPoint = _getPoint(event);
        _rect.attr('x', (_origin.x < newPoint.x) ? _origin.x : newPoint.x);
        _rect.attr('y', (_origin.y < newPoint.y) ? _origin.y : newPoint.y);
        _rect.attr('width', (_origin.x < newPoint.x) ? newPoint.x - _rect.attr('x') : _origin.x - newPoint.x);
        _rect.attr('height', (_origin.y < newPoint.y) ? newPoint.y - _rect.attr('y') : _origin.y - newPoint.y);

        // Sanity check

    }

    function _enable() {
        function setEnabled() {
            _enabled = true;
        }
        $timeout(setEnabled);
    }

    function _endRect(event) {
        console.log('end', event)
        _panzoom.off('panmove', _drawRect);
        Annotations.upsert({
            type: 'image',
            x: _rect.attr('x'),
            y: _rect.attr('y'),
            width: _rect.attr('width'),
            height: _rect.attr('height')
        });
        _rect.attr({
            width: 0,
            height: 0
        });
        $rootScope.$apply();
    }

    function _getPoint(event) {
        return toolUtils.getPoint(_svg, event.srcEvent);
    }

    function _startRect(event) {
        _origin = _getPoint(event);
        _rect.attr(_origin);
        _panzoom.on('panmove', _drawRect);
    }

}
