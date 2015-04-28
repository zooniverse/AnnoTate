'use strict';

require('./static.module.js')
    .config(Routes);

/**
 * @ngInject
 */
function Routes($stateProvider) {

    $stateProvider
        .state('Home', {
            url: '/',
            title: 'Home',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'static/home.html'
                }
            }
        });

}
