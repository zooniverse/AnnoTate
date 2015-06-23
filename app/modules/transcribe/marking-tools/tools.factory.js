'use strict';

require('./marking-tools.module.js')
    .factory('ToolsFactory', ToolsFactory);

var _ = require('lodash');

// @ngInject
function ToolsFactory($rootScope, textTool, imageTool, rangeTool) {

    var factory;

    factory = {
        text: new Tool(textTool),
        image: new Tool(imageTool),
        range: new Tool(rangeTool)
    };

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
                    if (tool.active) {
                        tool._deactivate();
                    }
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
