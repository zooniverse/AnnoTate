'use strict';

require('./marking-tools.module.js')
    .factory('toolUtils', toolUtils);

function toolUtils() {

    var factory;
    var interrupt;

    // Interrupt is just a boolean used to disable tools when e.g. dragging etc.
    interrupt = false;

    factory = {
        getPoint: getPoint,
        interrupt: interrupt
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
