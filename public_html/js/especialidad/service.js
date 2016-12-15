'use strict';
moduloEspecialidad.factory('especialidadService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Desc.", longname: "Descripción", visible: true, type: "text"},
                   
                ];
            },
            getIcon: function () {
                return "fa-stethoscope";
            },
            getObTitle: function () {
                return "especialidad";
            },
            getTitle: function () {
                return "especialidad";
            }
        };
    }]);


