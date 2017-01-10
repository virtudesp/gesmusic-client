moduloDirectivas.component('datePicker', {
    templateUrl: "js/system/components/datepicker/datepicker.html",
    controllerAs: 'dt',
    controller: datepicker,
    bindings: {
        // bean: '=',
        identificador: '=',
        form: '=',
        name: '<',
        longname: '<',
        required: '<'
    }

});

function datepicker(serverService) {
    var self = this;


//    $(function () {
//        console.log(self.identificador);
//        $("#" + self.identificador).datepicker();
//    });

//http://henriquat.re/directives/advanced-directives-combining-angular-with-existing-components-and-jquery/angularAndJquery.html

}


