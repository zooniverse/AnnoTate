'use strict';

require('./modals.module.js')
    .controller('TalkController', TalkController);

// @ngInject
function TalkController($modalInstance, $window, SubjectsFactory) {

    var vm = this;
    vm.close = close;
    vm.openTalk = openTalk;

    function close() {
        $modalInstance.close();
    }

    function openTalk() {
        $window.open('https://www.zooniverse.org/#/projects/drrogg/annotate/talk/subjects/' + SubjectsFactory.current.data.id, '_blank');
        close();
    }

}
