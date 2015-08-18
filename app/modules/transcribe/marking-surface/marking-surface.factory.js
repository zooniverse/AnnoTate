'use strict';

var _ = require('lodash');
var svgPanZoom = require('svg-pan-zoom');

require('./marking-surface.module.js')
    .factory('MarkingSurfaceFactory', MarkingSurfaceFactory);

// @ngInject
function MarkingSurfaceFactory(MarkingSurfaceConstants) {

    var factory;
    var svgElement;
    var _extendedFactory;
    var _svgPanZoom;
    var _svgRotateElement;

    factory = {
        $init: init
    };

    _extendedFactory = {
        disable: disable,
        enable: enable,
        isEnabled: true,
        getPoint: getPoint,
        resizeAndCentre: resizeAndCentre,
        rotate: rotate
    };

    return factory;

    function disable() {
        factory.isEnabled = false;
        _svgPanZoom.disablePan();
        _svgPanZoom.disableZoom();
    }

    function enable() {
        factory.isEnabled = true;
        _svgPanZoom.enablePan();
        _svgPanZoom.enableZoom();
    }


    function getPoint(event) {
        var rotateContainer;
        var point;
        var result;

        rotateContainer = svgElement.find('.rotate-container')[0];
        point = svgElement[0].createSVGPoint();
        event = (event.srcEvent) ? event.srcEvent : event;
        point.x = event.clientX;
        point.y = event.clientY;

        result = point.matrixTransform(rotateContainer.getScreenCTM().inverse());

        return {
            x: +(result.x).toFixed(2),
            y: +(result.y).toFixed(2)
        };
    }

    function init(element) {
        svgElement = element;
        _svgRotateElement = element.find('.rotate-container');
        _svgPanZoom = svgPanZoom(element[0], MarkingSurfaceConstants.svgPanZoom);
        _.extend(factory, _extendedFactory, { svg: svgElement });
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

        rotateTransform = svgElement[0].createSVGTransform();
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
