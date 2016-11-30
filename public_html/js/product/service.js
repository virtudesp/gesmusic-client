'use strict';
moduloProduct.factory('productService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "code", shortname: "Cod.", longname: "Código", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "description", shortname: "Desc.", longname: "Descripción", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "price", shortname: "Precio", longname: "Precio", visible: true, type: "decimal", required: true, maxlength: 255, pattern: ""},
                    {name: "stock", shortname: "En almacén", longname: "En almacén", visible: true, type: "integer", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_producttype", shortname: "Tipo prod.", longname: "Tipo de producto", visible: true, type: "specific", reference: "producttype"}
                ];
            },
            getIcon: function () {
                return "fa-gift";
            },
            getObTitle: function () {
                return "producto";
            },
            getTitle: function () {
                return "product";
            }
        };
    }]);


