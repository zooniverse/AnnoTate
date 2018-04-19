'use strict';

var appInfo = require('../../package.json');

var appConfig = {
    appTitle: 'AnnoTate',
    appDescription: 'Help the Tate discover the lives of twentieth-century artists by transcribing their letters, diaries and sketchbooks.',
    app_id: (function() {
        var APP_IDS = {
            staging: '387d539e68b2064b254fb67f477d8933c9d859db5358661e080034511d70b98c',
            production: '40557049c91840f89c2df75f44dbac5de2dfdfda3b44c49f2aa8f4a2381414ba',
        };
        return APP_IDS[process.env.NODE_ENV] || APP_IDS.staging;
    })(),
    graphqlEndpoint: 'https://caesar.zooniverse.org/graphql',
};

// @ngInject
function localStorage(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix(appConfig.appTitle + '-' + appInfo.version);
}

module.exports = {
    constants: appConfig,
    localStorage: localStorage
};
