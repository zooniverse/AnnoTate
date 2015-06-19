'use strict';

require('./marking-surface.module.js')
    .constant('MarkingSurfaceConstants', {
        svgPanZoom: {
            dblClickZoomEnabled: false,
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        }
    });
