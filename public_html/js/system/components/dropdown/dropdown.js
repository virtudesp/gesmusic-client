moduloDirectivas.component('dropdown', {
    templateUrl: "js/system/components/dropdown/dropdown.html",
    controllerAs: 'dd',
    bindings: {
        selectedoption: '=',
        tablereference: '<',
        descripcion: '<'
    },
    controller: dropdown
});

function dropdown(serverService) {
    var self = this;
    self.selected = {id: self.selectedoption};
    console.log(self.tablereference);
    this.$onInit = function () {
        serverService.promise_getAll(self.tablereference).then(function (response) {
            self.selections = response.data.message;
        }).catch(function (data) {
            console.log(data);
        });
    };
}