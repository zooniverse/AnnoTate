(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('TimeFactory', [
        '$log',
        '$window',
        'localStorageService',
        function ($log, $window, storage) {

            if (storage.get('times') === null) storage.set('times', {});

            var setStart = function (subject) {
                var times = storage.get('times');
                if (times.subject_id !== subject.id) {
                    times.subject_id = subject.id;
                    times.started_at = $window.moment().format();
                    storage.set('times', times);
                }
            };

            var getTimes = function () {
                var times = storage.get('times');
                return [
                    times.started_at,
                    $window.moment().format()
                ];
            };

            return {
                setStart: setStart,
                getTimes: getTimes
            };

        }]);

})(window.angular);
