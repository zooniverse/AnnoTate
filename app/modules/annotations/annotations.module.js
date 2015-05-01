'use strict';

var annotationsConfig = require('./annotations.config.js');

// A module for the static pages such as home, about etc.
module.exports = require('angular')
    .module('app.annotations', [])
    .constant('annotationsConfig', annotationsConfig.constants);
