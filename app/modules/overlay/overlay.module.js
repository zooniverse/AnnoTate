'use strict';

require('spin');
require('angular-spinner');

// A module for context menus, editing windows etc
module.exports = require('angular')
    .module('app.overlay', [
        'angularSpinner'
    ]);
