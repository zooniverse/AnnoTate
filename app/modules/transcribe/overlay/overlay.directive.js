'use strict';

require('./overlay.module.js')
    .directive('overlay', overlay);

function overlay() {
    var directive = {
        replace: true,
        templateUrl: 'overlay/overlay.html'
    };
    return directive;
}
