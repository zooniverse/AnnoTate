'use strict';

var annotationsConfig = require('./annotations.config.js');

// A module for the static pages such as home, about etc.
module.exports = require('angular')
    .module('app.transcribe.annotations', [])
    .constant('annotationsConfig', annotationsConfig.constants);
