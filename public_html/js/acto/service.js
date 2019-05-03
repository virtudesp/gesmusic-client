'use strict';
moduloActo.factory('actoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("palabra"), help: serverService.getRegExpl("palabra")},
                    {name: "parte", shortname: "Parte", longname: "Parte", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "lugar", shortname: "Lugar", longname: "Lugar", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "fecha", shortname: "Fecha", longname: "Fecha", visible: true, type: "date", required: false, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-bookmark";
            },
            getObTitle: function () {
                return "acto";
            },
            getTitle: function () {
                return "acto";
            },
            getId: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"}
                ];    
            }
        };
    }]);