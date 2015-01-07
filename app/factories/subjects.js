(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.factory('SubjectsFactory', [
        '$q',
        function ($q) {

            var _dummySubject = {
                image: '/images/image_03.jpg'
            };

            var get = function () {
                return $q.when(_dummySubject);
            };

            return {
                get: get
            };

        }]);

})(window.angular);
