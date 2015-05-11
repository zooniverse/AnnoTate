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
    var _hammer;
    var _origin;
    var _rect;
    var _subject;
    var _svg;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate(svg) {
        _svg = svg;
        _hammer = new Hammer(svg.find('.pan-zoom')[0]);

        if (_.isUndefined(_rect)) {
            _rect = angular.element(document.createElementNS(_svg[0].namespaceURI, 'rect'))
                .attr('class', 'image-annotation -temp')
                .appendTo(svg.find('.image-annotations').first());
        }

        _hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        _hammer.on('panstart', _startRect);
        _hammer.on('panend', _endRect);
        _enabled = true;
        $rootScope.$broadcast('enableImageTool');
    }

    function deactivate() {
        _hammer.destroy();
        $rootScope.$broadcast('disableImageTool');
    }

    function _checkOutOfBounds() {
        // // Out of bounds - left
        if (_rect.attr('x') < 0) {
            _rect.attr('x', 0);
            _rect.attr('width', _origin.x);
        }

        // // Out of bounds - right
        if (_rect.attr('width') > (_subject.width - _rect.attr('x'))) {
            _rect.attr('width', _subject.width - _rect.attr('x'));
        }

        // // Out of bounds - top
        if (_rect.attr('y') < 0) {
            _rect.attr('y', 0);
            _rect.attr('height', _origin.y);
        }

        // // Out of bounds - bottom
        if (_rect.attr('height') > (_subject.height - _rect.attr('y'))) {
            _rect.attr('height', _subject.height - _rect.attr('y'));
        }
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
        _checkOutOfBounds();
    }

    function _enable() {
        function setEnabled() {
            _enabled = true;
        }
        $timeout(setEnabled);
    }

    function _endRect() {
        _hammer.off('panmove', _drawRect);
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
        _hammer.on('panmove', _drawRect);
        _origin = _getPoint(event);
        _rect.attr(_origin);
        _subject = _svg.find('.subject').first()[0].getBBox();
    }
}
