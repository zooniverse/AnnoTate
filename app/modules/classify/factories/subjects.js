(function (angular, _, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('SubjectsFactory', [
        '$http',
        '$localStorage',
        '$q',
        'Config',
        function ($http, $localStorage, $q, Config) {

            if (_.isUndefined($localStorage.activeSubject)) {
                $localStorage.activeSubject = {};
            }

            var _get = function (endpoint, params) {
                return window.zooAPI.get(endpoint);
            };

            var getSubject = function () {
                return _get('/projects/6', { limit: 1 })
                    .then(_constructSubject)
                    .then(_setActiveSubject);
            };

            var _dummySubjects = ['TGA_7247_35_31.jpg', 'TGA_8222_1_68_1.jpg', 'TGA_8313_1_1_50_1.jpg', 'TGA_8812_1_3_2036_1.jpg', 'TGA_9013_1_31_1.jpg', 'TGA_9019_1_2_1_49.jpg', 'TGA_9019_2_1_4_98.jpg', 'TGA_9125_5_88_1.jpg', 'TGA_9510_3_3_20_1.jpg', 'TGA_969_2_4_219.jpg', 'TGA_9715_1_5_1.jpg', 'TGA_9920_2_255_1.jpg'];

            var getDummySubject = function () {

                var subjectImage = _.sample(_dummySubjects);

                var subject = {
                    tga: subjectImage.replace('TGA_', 'TGA ').replace(/\_/g, '/').replace(/\.[^/.]+$/, ''),
                    image: {
                        url: 'images/' + subjectImage
                    }
                };
                _setActiveSubject(subject)
                return $q.when(subject);
            };

            var _constructSubject = function (response) {
                var original = response.data.subjects[0];
                var image = original.locations[0];
                var subject = {
                    id: original.id,
                    rawSubject: original,
                    rawResponse: response,
                    image: {
                        type: Object.keys(image)[0],
                        url: image[Object.keys(image)[0]]
                    }
                };
                return subject;
            };

            var _setActiveSubject = function (subject) {
                $localStorage.activeSubject = subject;
                return subject;
            };

            var resetActiveSubject = function () {
                $localStorage.activeSubject = {};
            };

            var checkForSubject = function () {
                if (!_.isEmpty($localStorage.activeSubject)) {
                    return $q.when($localStorage.activeSubject)
                } else {
                    return getDummySubject();
                }
            };

            return {
                get: checkForSubject,
                resetActive: resetActiveSubject
            };

        }]);

})(window.angular, window._, window.zooAPI);
