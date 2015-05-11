'use strict';

// A module for transcription interface
module.exports = require('angular')
    .module('app.transcribe', [
        'app.annotations',
        'app.markingTools',
        'app.overlay'
    ]);
