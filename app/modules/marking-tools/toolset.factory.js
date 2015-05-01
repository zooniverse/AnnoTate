'use strict';

require('./marking-tools.module.js')
    .factory('toolSet', toolSet);

var _ = require('lodash');

/**
 * @ngInject
 */
function toolSet($rootScope, textTool, imageTool) {

    var factory;

    factory = {
        text: new Tool(textTool),
        image: new Tool(imageTool)
    }

    return factory;

    function Tool(toolFactory) {
        this.name = toolFactory.name;
        this.active = false;
        this.toggle = toggle;
        this.markingTool = toolFactory;
        this._activate = _activate;
        this._deactivate = _deactivate;

        function toggle() {
            if (this.active) {
                this._deactivate();
            } else {
                _.forOwn(factory, function (tool) {
                    if (tool.active) tool._deactivate();
                });
                this._activate();
            }
        }

        function _activate() {
            this.active = true;
            this.markingTool.activate();
        }

        function _deactivate() {
            this.active = false;
            this.markingTool.deactivate();
        }

    }

}
