'use strict';

require('./marking-tools.module.js')
    .factory('toolSet', toolSet);

var _ = require('lodash');

/**
 * @ngInject
 */
function toolSet() {

    var factory;

    factory = {
        text: new Tool('text'),
        image: new Tool('image')
    }

    return factory;

    function Tool(name) {
        this.name = name;
        this.active = false;
        this.toggle = toggle;
        this._activate = _activate;
        this._deactivate = _deactivate;

        function toggle() {
            var that = this;
            if (that.active) {
                that._deactivate();
            } else {
                _.forOwn(factory, function (tool) { tool._deactivate(); });
                that._activate();
            }
        }

        function _activate() {
            this.active = true;
        }

        function _deactivate() {
            this.active = false;
        }

    }


}
