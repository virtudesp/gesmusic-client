'use strict';
moduloTratamiento.factory('tratamientoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "obj_medicamento", shortname: "Medicamento", longname: "Medicamento", visible: true, type: "specific", reference: "medicamento"},
                    {name: "fecha_inicio", shortname: "Inicio", longname: "Fecha inicio", visible: true, type: "date", required: true, pattern: ""},
                    {name: "fecha_fin", shortname: "Fin", longname: "Fecha fin", visible: true, type: "date", required: true, pattern: ""},
                    {name: "cuidados", shortname: "Cuidados", longname: "Cuidados", visible: true, type: "textarea", required: true, maxlength: 9999, pattern: ""},
                    {name: "obj_via", shortname: "Via", longname: "Via", visible: true, type: "specific", reference: "via"},
                    {name: "obj_posologia", shortname: "Posología", longname: "Posología", visible: true, type: "specific", reference: "posologia"},
                    {name: "importe", shortname: "Importe", longname: "Importe", visible: true, type: "decimal", required: true, pattern: serverService.getRegExpr("decimal"), help: serverService.getRegExpl("decimal")},
                    {name: "obj_diagnostico", shortname: "Diagnóstico", longname: "Diagnóstico", visible: true, type: "specific", reference: "diagnostico"}
                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-align-left";
            },
            getObTitle: function () {
                return "tratamiento";
            },
            getTitle: function () {
                return "tratamiento";
            }
        };
    }]);


