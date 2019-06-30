'use strict';
moduloRepertorio.factory('repertorioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "obj_acto", shortname: "Acto", longname: "Acto", visible: true, type: "foreign", reference: "acto", descforeign: "acto"},
                    {name: "obj_obra", shortname: "Obra", longname: "Obra", visible: true, type: "foreign", reference: "obra", descforeign: "obra"},
                    {name: "obj_agrupacion", shortname: "Agrupación", longname: "Agrupación", visible: true, type: "foreign", reference: "agrupacion", descforeign: "agrupacion"}
                ];
            },
            getIcon: function () {
                return "fa-music";
            },
            getObTitle: function () {
                return "repertorio";
            },
            getTitle: function () {
                return "repertorio";
            }
        };
    }]);


