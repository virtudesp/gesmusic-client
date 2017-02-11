moduloDirectivas.component('radiogroup', {
    templateUrl: "js/system/components/radiogroup/radiogroup.html",
    controllerAs: 'rg',
    bindings: {
        required: '<',
        selectedbutton: '=',
        tablereference: '<',
        field: '<'
    },
    controller: radiogroup
});

function radiogroup(serverService) {
    var self = this;

    this.$onInit = function () {
        self.selected = {id: self.selectedbutton};
        serverService.promise_getAll(self.tablereference).then(function (response) {
            self.radiobuttons = response.data.message;
        }).catch(function (data) {
            console.log(data);
        });
    };
}