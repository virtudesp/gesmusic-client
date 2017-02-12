'use strict';
moduloTipodocumento.factory('tipodocumentoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                ];
            },
            getIcon: function () {
                return "fa-cart-plus";
            },
            getObTitle: function () {
                return "tipo de documento";
            },
            getTitle: function () {
                return "tipodocumento";
            }
        };
    }]);


