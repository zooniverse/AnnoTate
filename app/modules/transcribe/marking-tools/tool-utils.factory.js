'use strict';

require('./marking-tools.module.js')
    .factory('ToolUtilsFactory', ToolUtilsFactory);

// @ngInject
function ToolUtilsFactory(MarkingSurfaceFactory) {

    var factory;

    factory = {
        getPoint: getPoint
    };

    return factory;

    function getPoint(event) {
        var rotateContainer;
        var point;
        var result;
        var svg;

        svg = MarkingSurfaceFactory.svg;
        rotateContainer = svg.find('.rotate-container')[0];
        point = svg[0].createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;

        result = point.matrixTransform(rotateContainer.getScreenCTM().inverse());

        return {
            x: +(result.x).toFixed(2),
            y: +(result.y).toFixed(2)
        };
    }

}
