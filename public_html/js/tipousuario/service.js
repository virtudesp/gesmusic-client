'use strict';
moduloTipousuario.factory('tipousuarioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")}                    
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


