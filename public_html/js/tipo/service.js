'use strict';
moduloTipo.factory('tipoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Desc.", longname: "Descripcion", visible: true, type: "text"}
                ];
            },
            getIcon: function () {
                return "fa-archive";
            },
            getObTitle: function () {
                return "tipo";
            },
            getTitle: function () {
                return "tipo";
            }
        };
    }]);


