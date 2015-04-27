'use strict';

require('./demo.module.js')
    .controller('ExampleCtrl', ExampleCtrl);

/**
 * @ngInject
 */
function ExampleCtrl() {

    // ViewModel
    var vm = this;

    vm.title = 'AngularJS, Gulp, and Browserify!';
    vm.number = 1234;

}
