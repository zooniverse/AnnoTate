'use strict';

module.exports = require('angular')
    .module('app.transcribe', [
        'app.transcribe.markingSurface',
        'app.transcribe.annotations',
        'app.transcribe.markingTools',
        'app.transcribe.overlay'
    ]);
