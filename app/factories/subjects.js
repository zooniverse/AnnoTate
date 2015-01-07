(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.factory('SubjectsFactory', [
        function () {

            var _dummySubject = {
                image: '/images/image_03.jpg'
            };

            var get = function () {
                return _dummySubject;
            };

            return {
                get: get
            };

        }]);

})(window.angular);
