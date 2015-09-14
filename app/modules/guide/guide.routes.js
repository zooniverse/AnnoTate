'use strict';

require('./guide.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider, GuidePages) {

    $stateProvider
        .state('GuideBase', {
            parent: 'Base',
            url: '/guide',
            views: {
                'main': {
                    templateUrl: 'guide/guide-base.html',
                    controller: function () {
                        var vm = this;
                        vm.sections = GuidePages;
                    },
                    controllerAs: 'vm'
                }
            },
            params: {
                hideHook: true
            }
        })
        .state('GuidePage', {
            parent: 'GuideBase',
            url: '/:page',
            views: {
                'page': {
                    templateUrl: function ($stateParams) {
                        return 'guide/' + $stateParams.page + '.html';
                    }
                }
            },
            params: {
                hideHook: true
            }
        });

    $urlRouterProvider.when('/guide', '/guide/overview');

}
