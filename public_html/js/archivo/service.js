'use strict';
moduloArchivo.factory('archivoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Número", visible: true, type: "id"},
                    {name: "obj_obra", shortname: "Obra", longname: "Obra", visible: true, type: "foreign", reference: "obra", descforeign: "titulo"},
                    {name: "obj_compositor", shortname: "Compositor", longname: "Compositor", visible: true, type: "foreign", reference: "compositor", descforeign: ["nombre","apellidos"]},
                    {name: "alta", shortname: "Alta", longname: "Fecha de alta", visible: true, type: "date", required: false, pattern: ""},
                    {name: "arreglo", shortname: "Arreglo", longname: "Arreglo", visible: true, type: "text", required: false, maxlength: 255},
                    {name: "origen", shortname: "Origen", longname: "Origen", visible: true, type: "text", required: false, maxlength: 255}
                ];
            },
            getIcon: function () {
                return "fa-archive";
            },
            getObTitle: function () {
                return "archivo";
            },
            getTitle: function () {
                return "archivo";
            },
            getId: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"}
                ];    
            }
        };
    }]);