'use strict';
moduloServicios.factory('imagenService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "descripcion", shortname: "Desc.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "fecha", shortname: "fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_tecnica", shortname: "Técnica", longname: "tecnica", visible: true, type: "specific", required: true, reference: "tecnica"},
                    {name: "obj_prueba", shortname: "Prueba", longname: "prueba", visible: true, type: "specific", required: true, reference: "prueba"}
                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-picture-o";
            },
            getObTitle: function () {
                return "imagen";
            },
            getTitle: function () {
                return "imagen";
            }
        };
    }]);


