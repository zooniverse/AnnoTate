'use strict';

require('./transcribe.module.js')
    .constant('TranscribeConstants', {
        modals: {
            next: {
                templateUrl: 'transcribe/transcribe-next.html',
                controller: 'TranscribeNextController',
                controllerAs: 'vm',
                size: 'sm',
                backdrop: 'static'
            }
        },
        svgPanZoom: {
            dblClickZoomEnabled: false,
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        }
    });
