'use strict';
moduloTipomiembro.factory('tipomiembroService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "tipomiembro", shortname: "Tipo", longname: "Tipo de miembro", visible: true, type: "text", required: true, maxlength: 255, pattern: ""}
                ];
            },
            getIcon: function () {
                return "fa-list-ul";
            },
            getObTitle: function () {
                return "tipo de miembro";
            },
            getTitle: function () {
                return "tipomiembro";
            }
        };
    }]);


