'use strict';

require('./marking-tools.module.js')
    .factory('toolSet', toolSet);

var _ = require('lodash');

/**
 * @ngInject
 */
function toolSet($rootScope) {

    var factory;

    factory = {
        text: new Tool(require('./text.tool.js')),
        image: new Tool(require('./image.tool.js'))
    }

    return factory;

    function Tool(toolObject) {
        this.name = toolObject.name;
        this.active = false;
        this.toggle = toggle;
        this.markingTool = toolObject;
        this._activate = _activate;
        this._deactivate = _deactivate;

        function toggle() {
            var that = this;
            if (that.active) {
                that._deactivate();
            } else {
                _.forOwn(_.filter(factory, this), function (tool) { tool._deactivate(); });
                that._activate();
            }
        }

        function _activate() {
            this.active = true;
            $rootScope.$broadcast('activateTool', this);
        }

        function _deactivate() {
            this.active = false;
            $rootScope.$broadcast('deactivateTool', this);
        }

    }


}
