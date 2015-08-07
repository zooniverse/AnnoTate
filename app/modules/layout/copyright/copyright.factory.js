'use strict';

var _ = require('lodash');

require('./copyright.module.js')
    .factory('CopyrightFactory', CopyrightFactory);

// @ngInject
function CopyrightFactory() {

    var factory;
    var _copyrightString = '';

    factory = {
        get: get,
        set: set
    };

    // Init
    set();

    return factory;

    function get() {
        return _copyrightString;
    }

    function set(data) {
        data = (_.isArray(data)) ? _.unique(data) : [];
        var copyright = ['Banner: © Tate Photography © Tate, 2015.'].concat(data);
        _copyrightString = copyright.join(' ');
    }

}
