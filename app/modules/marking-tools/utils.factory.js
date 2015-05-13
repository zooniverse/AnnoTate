'use strict';

require('./marking-tools.module.js')
    .factory('toolUtils', toolUtils);

// @ngInject
function toolUtils() {

    var factory;

    factory = {
        getPoint: getPoint
    };

    return factory;

    function getPoint(svg, event) {
        var rotateContainer;
        var point;
        var result;

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
