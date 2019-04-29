'use strict';
moduloRol.factory('rolService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "rol", shortname: "Rol", longname: "Rol", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "rol";
            },
            getTitle: function () {
                return "rol";
            }
        };
    }]);