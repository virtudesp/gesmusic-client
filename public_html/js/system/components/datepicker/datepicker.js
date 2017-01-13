moduloDirectivas.component('datePicker', {
    templateUrl: "js/system/components/datepicker/datepicker.html",
    controllerAs: 'dt',
    controller: datepicker,
    bindings: {
        name: '<',
        required: '<',
        fecha: '=',
        fecha2: '='
    }
});

function datepicker(serverService) {
    var self = this;
    self.fecha="";
    self.fecha2="";
}


