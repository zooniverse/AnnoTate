'use strict';

require('./core.module.js')
    .config(logAllEvents);

// @ngInject
function logAllEvents($provide) {
    $provide.decorator('$rootScope', function($delegate) {
        var Scope = $delegate.constructor;
        var origBroadcast = Scope.prototype.$broadcast;
        var origEmit = Scope.prototype.$emit;

        Scope.prototype.$broadcast = function() {
            logEvent('$broadcast', arguments);
            return origBroadcast.apply(this, arguments);
        };

        Scope.prototype.$emit = function() {
            logEvent('$emit', arguments);
            return origEmit.apply(this, arguments);
        };
        return $delegate;
    });

    function logEvent(type, args) {
        var eventArgs = Array.prototype.slice.call(args);
        var message = [type, eventArgs.shift()].join(', ');
        if (eventArgs.length > 0) {
            console.log(message, eventArgs);
        } else {
            console.log(message);
        }
    }
}
