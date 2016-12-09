'use strict';
moduloTipousuario.factory('tipousuarioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "description", shortname: "Descripción.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "discount", shortname: "Descuento", longname: "Descuento", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("decimal"), help: serverService.getRegExpl("decimal")},
                ];
            },
            getIcon: function () {
                return "fa-user-o";
            },
            getObTitle: function () {
                return "tipo de usuario";
            },
            getTitle: function () {
                return "tipousuario";
            }
        };
    }]);


