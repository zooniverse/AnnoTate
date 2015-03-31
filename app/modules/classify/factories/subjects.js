(function (angular, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('SubjectsFactory', [
        'localStorageService',
        '$log',
        '$q',
        '$window',
        'ProjectFactory',
        function (storage, $log, $q, $window, Project) {

            if (storage.get('viewedSubjects') === null) storage.set('viewedSubjects', []);
            if (storage.get('subjectQueue') === null) storage.set('subjectQueue', []);

            // Helper function to return array of IDs from array of subjects
            var _returnIds = function (storedArray) {
                if (storedArray.length === 0)
                    return [];

                return storage.get(storedArray).map(function (subject) {
                    return subject.id;
                });
            };

            var _loadSubjectsIntoQueue = function () {

                var promise = Project()
                    .then(function (project) {
                        return $window.zooAPI.type('subjects').get({
                            sort: 'cellect',
                            workflow_id: project.links.workflows[0]
                        });
                    })
                    .then(function (subjects) {

                        var newSubjects = [];

                        // Create a list of ids of queued items
                        var rejectedIds = _returnIds('subjectQueue').concat(_returnIds('viewedSubjects'));

                        angular.forEach(subjects, function (subject) {

                            // Skip if its already queued up
                            if (rejectedIds.length > 0 && rejectedIds.indexOf(subject.id) !== -1)
                                return false;

                            // Delete any underscore-prefixed properties, as they contain circular refs
                            for (var property in subject) {
                                if (subject.hasOwnProperty(property) && property.charAt(0) === '_')
                                    delete subject[property];
                            }

                            newSubjects.push(subject);

                        });

                        storage.set('subjectQueue', storage.get('subjectQueue').concat(newSubjects));
                        return;

                    });

                return promise;

            };

            var _preloadImage = function (subject) {

                var deferred = $q.defer();

                subject.image = new Image();
                subject.image.src = subject.locations[0]['image/jpeg'];
                subject.image.onload = function () {
                    deferred.resolve(subject);
                };

                return deferred.promise;

            };

            var get = function () {

                var deferred = $q.defer();

                if (!storage.get('subjectQueue').length) {
                    $log.log('Loading new subjects into queue');
                    _loadSubjectsIntoQueue().then(deferred.resolve);
                } else {
                    deferred.resolve();
                }

                return deferred.promise
                    .then(function () {
                        return storage.get('subjectQueue')[0];
                    })
                    .then(_preloadImage);

            };

            var advance = function () {
                $log.log('Advancing subject queue');
                var subjects = storage.get('subjectQueue');
                var viewed = storage.get('viewedSubjects');
                viewed.unshift(subjects.shift());
                storage.set('viewedSubjects', viewed.filter(function (n) { return n != undefined }));
                storage.set('subjectQueue', subjects);
            };

            return {
                get: get,
                advance: advance
            };

        }]);

})(window.angular, window.zooAPI);
