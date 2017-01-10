moduloDirectivas.component('datePicker', {
    templateUrl: "js/system/components/datepicker/datepicker.html",
    controllerAs: 'dt',
    controller: datepicker,
    bindings: {
        name: '<',
        required: '<',
        picked: '='
    }

});

function datepicker(serverService) {
    var self = this;

}


