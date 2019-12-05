'use strict';
moduloMiembro.factory('miembroService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", chooser: false, shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "numero", chooser: true, shortname: "Número", longname: "Número de socio", visible: true, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "nombre", chooser: true, shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "apellidos", chooser: true, shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "nif", chooser: false, shortname: "NIF", longname: "NIF", visible: false, type: "text"},
                    {name: "direccion", chooser: false, shortname: "Dirección", longname: "Dirección", visible: false, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "codigopostal", chooser: false, shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("codigopostal"), help: serverService.getRegExpl("codigopostal")},
                    {name: "poblacion", chooser: false, shortname: "Población", longname: "Población", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "provincia", chooser: false, shortname: "Provincia", longname: "Provincia", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "pais", chooser: false, shortname: "País", longname: "País", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "telefono", chooser: false, shortname: "Teléfono", longname: "Teléfono", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("telefono"), help: serverService.getRegExpl("telefono")},
                    {name: "email", chooser: false, shortname: "Email", longname: "Email", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("email"), help: serverService.getRegExpl("email")},
                    {name: "fecha_alta", chooser: false, shortname: "Alta", longname: "Fecha alta", visible: true, type: "date", required: false, pattern: ""},
                    {name: "fecha_baja", chooser: false, shortname: "Baja", longname: "Fecha baja", visible: false, type: "date", required: false, pattern: ""},
                    {name: "obj_tipomiembro", chooser: false, shortname: "Tipo", longname: "Tipo miembro", visible: true, type: "foreign", reference: "tipomiembro", descforeign: "tipomiembro"}
                ];
            },
            getFields2: function (flag) {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", show: true, visible: true, type: "id"},
                    {name: "numero", shortname: "Número", longname: "Número de socio", show: true, visible: true, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", show: true, visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "apellidos", shortname: "Apellidos", longname: "Apellidos", show: true, visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
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