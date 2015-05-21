'use strict';

require('ng-load');

// A module for transcription interface
module.exports = require('angular')
    .module('app.transcribe', [
        'ngLoad',

        'app.annotations',
        'app.markingTools',
        'app.overlay',
        'app.subjects'
    ]);
