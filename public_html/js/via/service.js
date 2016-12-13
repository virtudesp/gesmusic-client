'use strict';
moduloVia.factory('viaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "descripcion", longname: "descripcion", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "obj_medicamento", shortname: "medicamento", longname: "medicamento", visible: true, type: "specific", required: true, reference: "medicamento"}
                ];
            },
            getIcon: function () {
                return "fa-medkit";
            },
            getObTitle: function () {
                return "vía";
            },
            getTitle: function () {
                return "via";
            }
        };
    }]);


