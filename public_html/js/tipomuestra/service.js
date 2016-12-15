'use strict';
moduloTipomuestra.factory('tipomuestraService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Desc.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},

                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-cube";
            },
            getObTitle: function () {
                return "tipomuestra";
            },
            getTitle: function () {
                return "tipomuestra";
            }
        };
    }]);


