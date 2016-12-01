'use strict';
moduloUser.factory('userService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "name", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "surname", shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "login", shortname: "Login", longname: "Login", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    //{name: "password", shortname: "Password", longname: "Password", visible: false, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("login"), help: serverService.getRegExpl("login")},
                    {name: "address", shortname: "Dirección", longname: "Dirección", visible: false, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "city", shortname: "Ciudad", longname: "Ciudad", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "zip", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("codigopostal"), help: serverService.getRegExpl("codigopostal")},
                    {name: "state", shortname: "Provincia", longname: "Provincia", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "country", shortname: "País", longname: "País", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "email", shortname: "Email", longname: "Email", visible: false, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("email"), help: serverService.getRegExpl("email")},
                    {name: "phone", shortname: "Teléfono", longname: "Teléfono", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("telefono"), help: serverService.getRegExpl("telefono")},
                    {name: "obj_usertype", shortname: "Tipo", longname: "Tipo de usuario", visible: true, type: "specific", reference: "usertype"}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "usuario";
            },
            getTitle: function () {
                return "user";
            }
        };
    }]);


