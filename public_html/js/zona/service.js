'use strict';
moduloZona.factory('zonaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-flask";
            },
            getObTitle: function () {
                return "zona";
            },
            getTitle: function () {
                return "zona";
            }
        };
    }]);


