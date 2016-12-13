'use strict';
moduloTipodiagnostico.factory('tipodiagnosticoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("palabra"), help: serverService.getRegExpl("palabra")}
                ];
            },
            getIcon: function () {
                return "fa-list-alt";
            },
            getObTitle: function () {
                return "tipo de diagnóstico";
            },
            getTitle: function () {
                return "tipodiagnostico";
            }
        };
    }]);


