moduloDirectivas.component('datePicker', {
    templateUrl: "js/system/components/datepicker/datepicker.html",
    controllerAs: 'dt',
    bindings: {
        name: '<',
        required: '<',
        fecha: '='
    }
});
