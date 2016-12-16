'use strict';
moduloZonaimagen.factory('zonaimagenService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "obj_zona", shortname: "zona", longname: "zona", visible: true, type: "specific", required: true, reference: "zona"},
                    {name: "obj_imagen", shortname: "imagen", longname: "imagen", visible: true, type: "specific", required: true, reference: "imagen"}
                ];
            },
            getIcon: function () {
                return "fa-dot-circle-o";
            },
            getObTitle: function () {
                return "zonaimagen";
            },
            getTitle: function () {
                return "zonaimagen";
            }
        };
    }]);


