(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify', []);

    module.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('classify', {
                    url: '/classify',
                    templateUrl: 'classify/templates/classify.html',
                    controller: 'ClassifyCtrl',
                    slug: 'classify'
                });
        }
    ]);

    module.constant('DummySubjects', [
        {
            id: 'TGA_8812_1_3_2036_1',
            tga: 'TGA 8812/1/3/2036/1',
            image: {
                url: 'images/TGA_8812_1_3_2036_1.jpg'
            },
            links: {
                prev: null,
                next: 'TGA_9013_1_31_1'
            }
        }, {
            id: 'TGA_9013_1_31_1',
            tga: 'TGA 9013/1/31/1',
            image: {
                url: 'images/TGA_9013_1_31_1.jpg'
            },
            links: {
                prev: 'TGA_8812_1_3_2036_1',
                next: 'TGA_9019_2_1_4_98'
            }
        }, {
            id: 'TGA_9019_2_1_4_98',
            tga: 'TGA 9019/2/1/4/98',
            image: {
                url: 'images/TGA_9019_2_1_4_98.jpg'
            },
            links: {
                prev: 'TGA_9013_1_31_1',
                next: null
            }
        }
    ]);

}(window.angular));
