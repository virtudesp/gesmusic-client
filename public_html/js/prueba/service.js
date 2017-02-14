'use strict';
moduloServicios.factory('pruebaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "informe", shortname: "Informe", longname: "Informe", visible: true, type: "textarea", required: true, pattern: ""},
                    {name: "fecha_peticion", shortname: "Fecha petición", longname: "Fecha petición", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, type: "specific", required: true, reference: "episodio"},
                    {name: "importe", shortname: "Importe", longname: "Importe", visible: true, type: "decimal", maxlength: 255, pattern: serverService.getRegExpr("decimal"), help: serverService.getRegExpl("decimal"), required: true}
                ];
            },
            getIcon: function () {
                return "fa-thermometer-half";
            },
            getObTitle: function () {
                return "prueba";
            },
            getTitle: function () {
                return "prueba";
            }
        };
    }]);


