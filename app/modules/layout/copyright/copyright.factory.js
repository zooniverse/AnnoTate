'use strict';

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

    set();

    return factory;

    function get() {
        return _copyrightString;
    }

    function set(data) {
        var copyright = ['Banner: © Tate Photography © Tate, 2015.'].concat(data);
        _copyrightString = copyright.join(' ');
    }

}
