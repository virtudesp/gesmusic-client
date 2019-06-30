'use strict';
moduloTipousuario.factory('tipousuarioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "tipousuario", shortname: "Descripción", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255},
                    {name: "total", shortname: "Num. usuarios", longname: "Número de usuarios", visible: true, type: "integer", required: false, maxlength: 9999}
                ];
            },
            getIcon: function () {
                return "fa-user-o";
            },
            getObTitle: function () {
                return "tipo de usuario";
            },
            getTitle: function () {
                return "tipousuario";
            }
        };
    }]);


