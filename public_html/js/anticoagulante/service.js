'use strict';
moduloAnticoagulante.factory('anticoagulanteService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Descripción", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-hourglass-1";
            },
            getObTitle: function () {
                return "anticoagulante";
            },
            getTitle: function () {
                return "anticoagulante";
            }
        };
    }]);


