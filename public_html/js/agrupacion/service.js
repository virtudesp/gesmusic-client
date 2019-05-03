'use strict';
moduloAgrupacion.factory('agrupacionService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "agrupacion", shortname: "Agrupacion", longname: "Agrupacion", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "agrupacion";
            },
            getTitle: function () {
                return "agrupacion";
            }
        };
    }]);