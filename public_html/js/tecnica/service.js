'use strict';
moduloTecnica.factory('tecnicaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa fa-file";
            },
            getObTitle: function () {
                return "tecnica";
            },
            getTitle: function () {
                return "tecnica";
            }
        };
    }]);


