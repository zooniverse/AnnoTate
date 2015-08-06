'use strict';

module.exports = require('angular')
    .module('app.transcribe', [
        'app.transcribe.aggregations',
        'app.transcribe.annotations',
        'app.transcribe.markingSurface',
        'app.transcribe.markingTools',
        'app.transcribe.modals',
        'app.transcribe.overlay'
    ]);
