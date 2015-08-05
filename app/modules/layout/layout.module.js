'use strict';

module.exports = require('angular')
    .module('app.layout', [
        'app.layout.header',
        'app.layout.copyright',
        'app.layout.footer'
    ]);
