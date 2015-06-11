'use strict';

var _ = require('lodash');
var svgPanZoom = require('svg-pan-zoom');

require('./transcribe.module.js')
    .factory('MarkingSurfaceFactory', MarkingSurfaceFactory);

// @ngInject
function MarkingSurfaceFactory() {

    var factory;
    var _extendedFactory;
    var _options;
    var _svgElement;
    var _svgPanZoom;
    var _svgRotateElement;

    factory = {
        $init: init
    };

    _extendedFactory = {
        resizeAndCentre: resizeAndCentre,
        rotate: rotate
    };

    _options = {
        dblClickZoomEnabled: false,
        fit: false,
        minZoom: 0.2,
        zoomScaleSensitivity: 0.05
    };

    return factory;

    function init(element) {
        _svgElement = element;
        _svgRotateElement = element.find('.rotate-container');
        _svgPanZoom = svgPanZoom(element[0], _options);
        _.extend(factory, _extendedFactory);
        return factory;
    }

    function rotate(theta) {
        var centre;
        var rotateTransform;
        var transformList;

        centre = {
            x: _svgRotateElement[0].getBBox().width / 2,
            y: _svgRotateElement[0].getBBox().height / 2
        };

        rotateTransform = _svgElement[0].createSVGTransform();
        rotateTransform.setRotate(theta, centre.x, centre.y);
        transformList = _svgRotateElement[0].transform.baseVal;
        transformList.appendItem(rotateTransform);
    }

    function resizeAndCentre() {
        _svgPanZoom.updateBBox();
        _svgPanZoom.resize();
        _svgPanZoom.center();
        _svgPanZoom.fit();
    }
}
