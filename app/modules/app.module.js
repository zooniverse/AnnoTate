'use strict';

var angular = require('angular');
var bulk = require('bulk-require');
var oauth = require('panoptes-client/lib/oauth');

// Angular modules
var appConfig = require('./app.config.js');
require('es6-promise').polyfill();
require('angular-bootstrap');
require('angular-local-storage');
require('@uirouter/angularjs');
require('angular-hotkeys');
require('angular-animate');
// App modules
bulk(__dirname, ['./**/!(app.module).js']);

// Create and bootstrap application
angular.element(document).ready(function () {
    oauth.init(appConfig.constants.app_id)
        .then(startApp, function (error) { console.error('Error starting the app', error)});
});


function startApp() {

    var requires = [
        // Angular modules
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule',
        'cfp.hotkeys',
        'ngAnimate',

        // App modules
        'app.core',
        'app.guide',
        'app.static',
        'app.404',
        'app.layout',
        'app.setSelector',
        'app.transcribe',
        'app.zooapi'
    ];

    // Mount on window for testing
    window.app = angular
        .module('app', requires)
        .constant('appConfig', appConfig.constants)
        .config(appConfig.localStorage);

    angular.bootstrap(document, ['app'], {
        strictDi: true
    });

}
