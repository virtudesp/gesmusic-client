'use strict';
moduloEntidad.factory('entidadService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "numero", shortname: "Número", longname: "Número de socio", visible: true, type: "calculado", required: false, maxlength: 255, pattern: ""},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "apellidos", shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "nif", shortname: "NIF", longname: "NIF", visible: true, type: "text"},
                    {name: "direccion", shortname: "Dirección", longname: "Dirección", visible: false, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "codigopostal", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("codigopostal"), help: serverService.getRegExpl("codigopostal")},
                    {name: "poblacion", shortname: "Población", longname: "Población", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "provincia", shortname: "Provincia", longname: "Provincia", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "pais", shortname: "País", longname: "País", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "telefono", shortname: "Teléfono", longname: "Teléfono", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("telefono"), help: serverService.getRegExpl("telefono")},
                    {name: "movil", shortname: "Móvil", longname: "Móvil", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("telefono"), help: serverService.getRegExpl("telefono")},
                    {name: "email", shortname: "Email", longname: "Email", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("email"), help: serverService.getRegExpl("email")},
                    {name: "web", shortname: "Web", longname: "Web", visible: false, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("web"), help: serverService.getRegExpl("web")},
                    {name: "fecha_alta", shortname: "Alta", longname: "Fecha alta", visible: true, type: "date", required: false, pattern: ""},
                    {name: "fecha_baja", shortname: "Baja", longname: "Fecha baja", visible: true, type: "date", required: false, pattern: ""},
                    {name: "obj_sociedad", shortname: "Sociedad", longname: "Sociedad", visible: true, type: "foreign", reference: "sociedad", descforeign: "nombre"},
                    {name: "obj_tipoentidad", shortname: "Tipo", longname: "Tipo entidad", visible: true, type: "foreign", reference: "tipoentidad", descforeign: "tipoentidad"}
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getObTitle: function () {
                return "entidad";
            },
            getTitle: function () {
                return "entidad";
            }
        };
    }]);