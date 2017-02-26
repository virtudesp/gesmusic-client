'use strict';
moduloTipoentidad.factory('tipoentidadService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "tipoentidad", shortname: "Tipo", longname: "Tipo de entidad", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "inicial", shortname: "Inicial", longname: "Inicial", visible: false, type: "text", required: true, maxlength: 1, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")}
                ];
            },
            getIcon: function () {
                return "fa-list-ul";
            },
            getObTitle: function () {
                return "tipo de usuario";
            },
            getTitle: function () {
                return "tipoentidad";
            }
        };
    }]);


