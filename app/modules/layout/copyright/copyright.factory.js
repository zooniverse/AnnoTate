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

    function set() {
        var copyrights = _.toArray(arguments);
        copyrights.unshift('Banner: © Tate Photography © Tate, 2015.');
        copyrights = _.flatten(copyrights, true);
        _.forEach(copyrights, function (item, i) {
            if (_.isPlainObject(item)) {
                copyrights[i] = item.imageCopyright;
            }
        });
        _copyrightString = copyrights.join(' ');
    }

}
