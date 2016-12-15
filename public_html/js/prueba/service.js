'use strict';
moduloServicios.factory('pruebaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "informe", shortname: "Informe", longname: "Informe", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "fecha_peticion", shortname: "Fecha petición", longname: "Fecha petición", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, type: "specific", required: true, reference: "episodio"},
                    {name: "importe", shortname: "Importe", longname: "Importe", visible: true, type: "decimal", pattern: serverService.getRegExpr("decimal"), help: serverService.getRegExpl("decimal")},
                    {name: "obj_imagen", shortname: "Imagen", longname: "Imagen", visible: true, type: "specific", required: true, reference: "imagen"},
                    {name: "obj_analitica", shortname: "Analítica", longname: "Analítica", visible: true, type: "specific", required: true, reference: "analitica"}
                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-exclamation-triangle";
            },
            getObTitle: function () {
                return "prueba";
            },
            getTitle: function () {
                return "prueba";
            }
        };
    }]);


