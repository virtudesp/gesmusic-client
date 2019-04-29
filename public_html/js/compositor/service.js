'use strict';
moduloCompositor.factory('compositorService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "apellidos", shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "notas", shortname: "Notas", longname: "Notas", visible: true, type: "text", required: false, maxlength: 9999}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "compositor";
            },
            getTitle: function () {
                return "compositor";
            }
        };
    }]);


