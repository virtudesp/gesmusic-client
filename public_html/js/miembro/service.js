'use strict';
moduloMiembro.factory('miembroService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "numero", shortname: "Número", longname: "Número de socio", visible: true, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "apellidos", shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "nif", shortname: "NIF", longname: "NIF", visible: false, type: "text"},
                    {name: "direccion", shortname: "Dirección", longname: "Dirección", visible: false, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "codigopostal", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("codigopostal"), help: serverService.getRegExpl("codigopostal")},
                    {name: "poblacion", shortname: "Población", longname: "Población", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "provincia", shortname: "Provincia", longname: "Provincia", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "pais", shortname: "País", longname: "País", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "telefono", shortname: "Teléfono", longname: "Teléfono", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("telefono"), help: serverService.getRegExpl("telefono")},
                    {name: "email", shortname: "Email", longname: "Email", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("email"), help: serverService.getRegExpl("email")},
                    {name: "fecha_alta", shortname: "Alta", longname: "Fecha alta", visible: true, type: "date", required: false, pattern: ""},
                    {name: "fecha_baja", shortname: "Baja", longname: "Fecha baja", visible: false, type: "date", required: false, pattern: ""},
                    {name: "obj_tipomiembro", shortname: "Tipo", longname: "Tipo miembro", visible: true, type: "foreign", reference: "tipomiembro", descforeign: "tipomiembro"}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "miembro";
            },
            getTitle: function () {
                return "miembro";
            }
        };
    }]);