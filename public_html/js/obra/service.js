'use strict';
moduloObra.factory('obraService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "titulo", shortname: "Título", longname: "Título", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre")},
                    {name: "subtitulo", shortname: "Subtítulo", longname: "Subtítulo", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre")},
                    {name: "notas", shortname: "Notas", longname: "Notas", visible: true, type: "text", required: false, maxlength: 9999},
                    {name: "obj_compositor", shortname: "Compositor", longname: "Compositor", visible: true, type: "foreign", reference: "compositor", descforeign: "compositor"}
                ];
            },
            getIcon: function () {
                return "fa-music";
            },
            getObTitle: function () {
                return "obra";
            },
            getTitle: function () {
                return "obra";
            }
        };
    }]);


