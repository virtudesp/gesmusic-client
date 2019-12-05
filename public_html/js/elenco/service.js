'use strict';
moduloElenco.factory('elencoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "obj_miembro", shortname: "Miembro", longname: "Miembro", visible: true, type: "foreign", reference: "miembro", descforeign: ["nombre","apellidos"]},
                    {name: "obj_agrupacion", shortname: "Agrupación", longname: "Agrupación", visible: false, type: "foreign", reference: "agrupacion", descforeign: "agrupacion"},
                    {name: "obj_rol", shortname: "Rol", longname: "Rol", visible: true, type: "foreign", reference: "rol", descforeign: "rol"}
                ];
            },
            getFields2: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "agrupacion", shortname: "Agrupación", longname: "Agrupación", visible: true, type: "text"}
                ];
            },
            getIcon: function () {
                return "fa-users";
            },
            getObTitle: function () {
                return "elenco";
            },
            getTitle: function () {
                return "elenco";
            }
        };
    }]);


