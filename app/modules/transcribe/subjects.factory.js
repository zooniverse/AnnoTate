'use strict';

var _ = require('lodash');
var moment = require('moment');

require('./transcribe.module.js')
    .factory('SubjectsFactory', SubjectsFactory);

// @ngInject
function SubjectsFactory($q, localStorageService, zooAPI, zooAPIProject) {

    if (localStorageService.get('subjects') === null) {
        localStorageService.set('subjects', {
            current: null
        });
    }

    var factory;
    var _data = localStorageService.get('subjects');
    var _queue = [];
    var _subjectSet = null;

    factory = {
        $advanceQueue: advanceQueue,
        $getData: getData,
        current: null,
        loading: false
    };

    return factory;

    function advanceQueue() {
        factory.loading = true;
        if (_data.current) {
            _data.current = null;
            _updateStorage();
        }
        if (_queue.length === 0) {
            return _populateQueue()
                .then(_setCurrent);
        } else {
            return $q.when(_setCurrent());
        }
    }

    function getData(subjectSet) {
        factory.loading = true;
        _subjectSet = (subjectSet) ? subjectSet : null;

        if (_subjectSet) {
            _queue.length = 0;
            return advanceQueue()
                .then(_createSubject);
        } else if (_data.current) {
            return _createSubject();
        } else {
            return advanceQueue()
                .then(_createSubject);
        }
    }

    function _createSubject() {
        factory.current = {
            data: _data.current,
            image: false
        };
        return $q.when(factory.current.data)
            .then(_loadImage);
    }

    function _loadImage() {
        var deferred = $q.defer();
        factory.current.image = new Image();
        factory.current.image.src = factory.current.data.locations[0]['image/jpeg'];
        factory.current.image.onload = function () {
            factory.loading = false;
            deferred.resolve();
        };
        return deferred.promise;
    }

    function _populateQueue() {
        return zooAPIProject.get()
            .then(function (project) {
                return zooAPI.type('subjects').get({
                    sort: 'queued',
                    workflow_id: project.links.workflows[0],
                    // Get a random set if one isn't specified already
                    subject_set_id: (_subjectSet) ? _subjectSet : _.sample(project.links.subject_sets)
                });
            })
            .then(function (subjects) {
                if (subjects.length) {
                    _queue = _queue.concat(subjects);
                    return _queue;
                } else {
                    factory.loading = false;
                    return $q.reject('outOfData');
                }
            });
    }

    function _setCurrent() {
        _data.current = _queue.shift();
        _data.current.started_at = moment().format();
        _updateStorage();
    }

    function _updateStorage() {
        localStorageService.set('subjects', _data);
    }

}
