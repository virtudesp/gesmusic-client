'use strict';
moduloRepertorio.factory('repertorioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "obj_acto", shortname: "Acto", longname: "Acto", visible: true, type: "foreign3", reference: "acto", descforeign: "nombre"},
                    {name: "obj_obra", shortname: "Obra", longname: "Obra", visible: true, type: "foreign", reference: "obra", descforeign: "titulo"},
                    {name: "obj_agrupacion", shortname: "Agrupación", longname: "Agrupación", visible: true, type: "foreign2", reference: "agrupacion", descforeign: "agrupacion"}
                ];
            },
            getFieldsObra: function (flag) {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: false, type: "id"},
                    {name: "titulo", shortname: "Título", longname: "Título", visible: true, type: "text", required: true, maxlength: 255},
                    {name: "subtitulo", shortname: "Subtítulo", longname: "Subtítulo", visible: true, type: "text", required: false, maxlength: 255, pattern: serverService.getRegExpr("nombre")},
                    {name: "notas", shortname: "Notas", longname: "Notas", visible: true, type: "text", required: false, maxlength: 9999},
                    {name: "obj_compositor", shortname: "Compositor", longname: "Compositor", visible: flag, type: "foreign", reference: "compositor", descforeign: "compositor"}
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


