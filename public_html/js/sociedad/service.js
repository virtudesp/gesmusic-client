'use strict';
moduloSociedad.factory('sociedadService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255},
                    {name: "razon_social", shortname: "RazónSoc.", longname: "Razón Social", visible: false, type: "text", required: false},
                    {name: "nif", shortname: "NIF", longname: "NIF", visible: false, type: "text", required: false, maxlength: 20},
                    {name: "direccion", shortname: "Dirección", longname: "Dirección", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "poblacion", shortname: "Población", longname: "Población", visible: false, type: "text", required: false, maxlength: 255},
                    {name: "provincia", shortname: "Provincia", longname: "Provincia", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "pais", shortname: "País", longname: "País", visible: false, type: "text", required: false, maxlength: 255,},
                    {name: "codigopostal", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: false, maxlength: 255},
                    {name: "telefono", shortname: "Teléfono", longname: "Teléfono", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "email", shortname: "Email", longname: "Email", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("email"), help: serverService.getRegExpl("email")},
                    {name: "web", shortname: "Web", longname: "Web", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("web"), help: serverService.getRegExpl("web")}
                ];
            },
            getIcon: function () {
                return "fa-users";
            },
            getObTitle: function () {
                return "sociedad";
            },
            getTitle: function () {
                return "sociedad";
            }
        };
    }]);


