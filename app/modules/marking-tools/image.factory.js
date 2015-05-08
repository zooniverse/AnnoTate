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
    var _panzoom;
    var _svg;

    factory = {
        name: 'image',
        activate: activate,
        deactivate: deactivate
    };

    return factory;


    function activate(svg) {
        _svg = svg;
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
        console.log('draw')
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
    }

    function _startRect(event) {
        console.log('start')
        _panzoom.on('panmove', _drawRect);
    }

}
