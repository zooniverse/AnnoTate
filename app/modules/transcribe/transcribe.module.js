'use strict';

require('ng-load');

// A module for transcription interface
module.exports = require('angular')
    .module('app.transcribe', [
        // 'ngLoad',

        // 'app.transcribe.annotations',
        // 'app.transcribe.markingTools',
        'app.transcribe.overlay',
        // 'app.subjects'
    ]);
