moduloDirectivas.component('foreignKey', {
    templateUrl: "js/system/components/foreignkey/foreignkey.html",
    controllerAs: 'fk',
    controller: foreignkey,
    bindings: {
        bean: '=',
        form: '=',
        metadata: '<'
    }

});

function foreignkey(serverService, $uibModal) {
    var self = this;

    self.chooseOne = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/' + self.metadata.reference + '/selection.html',
            controller: self.metadata.longname + "SelectionController",
            size: 'lg'
        }).result.then(function (modalResult) {
            self.change(modalResult);
        });
    };

    self.change = function (id) {
        if (!self.metadata.required && (id <= 0 || id == "" || id == undefined)) {
            self.bean[self.metadata.name].id = null;
            self.form[self.metadata.name].$setValidity('exists', true);
            return;
        }
        if (self.bean) {
            serverService.promise_getOne(self.metadata.reference, id).then(function (response) {
                var old_id = id;
                self.bean[self.metadata.name] = response.data.message;
                if (response.data.message.id <= 0) {
                    self.form[self.metadata.name].$setValidity('exists', false);
                    self.bean[self.metadata.name].id = old_id;
                } else {

                    self.form[self.metadata.name].$setValidity('exists', true);
                    if (Array.isArray(self.metadata.desc)) {

                        self.desc = "";
                        for (var d of self.metadata.desc) {

                            self.desc += self.bean[self.metadata.name][d] + " ";
                        }
                    }else{
                        self.desc = self.bean[self.metadata.name][self.metadata.desc]
                    }
                }
            }).catch(function (data) {
                self.form[self.metadata.name].$setValidity('exists', false);
            });
        }
    }

}


