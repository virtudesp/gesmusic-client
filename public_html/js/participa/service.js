'use strict';
moduloParticipa.factory('participaService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "obj_acto", shortname: "Acto", longname: "Acto", visible: false, type: "foreign", reference: "acto", descforeign: "acto"},
                    {name: "obj_agrupacion", shortname: "Agrupación", longname: "Agrupación", visible: true, type: "foreign", flag:"foreign", reference: "agrupacion", descforeign: "agrupacion"}
                ];
            },
            getIcon: function () {
                return "fa-bookmark";
            },
            getObTitle: function () {
                return "participa";
            },
            getTitle: function () {
                return "participa";
            },
            getId: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"}
                ];    
            }
        };
    }]);