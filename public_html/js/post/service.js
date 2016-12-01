'use strict';
moduloPost.factory('postService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "title", shortname: "Título", longname: "Título", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr("nombre"), help: serverService.getRegExpl("nombre")},
                    {name: "content", shortname: "Contenido", longname: "Contenido", visible: false, type: "textarea", required: true, maxlength: 5000, pattern: ""},
                    {name: "creation", shortname: "F.creación", longname: "Fecha de creación", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "modification", shortname: "F.modificación", longname: "Fecha de modificación", visible: false, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "hits", shortname: "Impactos", longname: "Impactos", visible: false, type: "integer", required: false, maxlength: 255, pattern: serverService.getRegExpr("integer"), help: serverService.getRegExpl("integer")},
                    {name: "obj_user", shortname: "Usuario", longname: "Usuario", visible: true, type: "specific", required: true, reference:"user"},
                    {name: "labels", shortname: "Etiquetas", longname: "Etiquetas", visible: false, type: "text", required: false, maxlength: 255, pattern: ""},
                    {name: "published", shortname: "¿Publicado?", longname: "¿Publicado?", visible: true, type: "boolean", required: false, maxlength: 255, pattern: ""},
                    {name: "frontpaged", shortname: "¿Primera página?", longname: "¿Primera página?", visible: true, type: "boolean", required: false, maxlength: 255, pattern: ""},
                    {name: "emphasized", shortname: "¿Destacado?", longname: "¿Destacado?", visible: true, type: "boolean", required: false, maxlength: 255, pattern: ""},
                ];
            },
            getIcon: function () {
                return "fa-file-text-o";
            },
            getObTitle: function () {
                return "publicación";
            },
            getTitle: function () {
                return "post";
            }
        };
    }]);


