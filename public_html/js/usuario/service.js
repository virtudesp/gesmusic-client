'use strict';
moduloUsuario.factory('usuarioService', ['serverService', function (serverService) {
        return {
            getFields: function (flag) {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "username", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "userpass", shortname: "Contraseña", longname: "Contraseña", visible: false, type: "password", required: true, maxlength: 25, pattern: serverService.getRegExpr("password"), help: serverService.getRegExpl("password")},
                    {name: "obj_tipousuario", shortname: "Tipo", longname: "Tipo de usuario", visible: flag, type: "foreign", reference: "tipousuario", descforeign: "tipousuario"}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "usuario";
            },
            getTitle: function () {
                return "usuario";
            }
        };
    }]);


