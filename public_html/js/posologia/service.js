'use strict';
moduloPosologia.factory('posologiaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    //{name: "descripcion", shortname: "descripcion", longname: "descripcion", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "descripcion", shortname: "Desc.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_medicamento", shortname: "Medicamento", longname: "Medicamento", visible: true, type: "specific", required: true, reference: "medicamento"}

                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-tint";
            },
            getObTitle: function () {
                return "posologia";
            },
            getTitle: function () {
                return "posologia";
            }
        };
    }]);


