'use strict';
moduloMedico.factory('medicoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "obj_servicio", shortname: "Servicio", longname: "Servicio", visible: true, type: "specific", reference: "servicio"},
                    {name: "obj_especialidad", shortname: "Especialidad", longname: "Especialidad", visible: true, type: "specific", reference: "especialidad"}
                ];
            },
            getIcon: function () {
                return "fa-user-md";
            },
            getObTitle: function () {
                return "médico";
            },
            getTitle: function () {
                return "medico";
            }
        };
    }]);


