'use strict';
moduloServicios.factory('userService', function () {
    return {
        getFields: function () {
            return [
                {name: "id", shortname: "ID", longname: "Identificador", visible: true},
                {name: "name", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255},
                {name: "surname", shortname: "Apellidos", longname: "Apellidos", visible: true, type: "text", required: true, maxlength: 255},
                {name: "login", shortname: "Login", longname: "Login", visible: true, type: "text", required: true, maxlength: 255},
                {name: "password", shortname: "Password", longname: "Password", visible: false, type: "text", required: true, maxlength: 255},
                {name: "address", shortname: "Dirección", longname: "Dirección", visible: false, type: "text", required: true, maxlength: 255},
                {name: "city", shortname: "Ciudad", longname: "Ciudad", visible: false, type: "text", required: true, maxlength: 255},
                {name: "zip", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false, type: "text", required: true, maxlength: 255},
                {name: "state", shortname: "Provincia", longname: "Provincia", visible: false, type: "text", required: true, maxlength: 255},
                {name: "country", shortname: "País", longname: "País", visible: false, type: "text", required: true, maxlength: 255},
                {name: "email", shortname: "Email", longname: "Email", visible: false, type: "text", required: true, maxlength: 255},
                {name: "phone", shortname: "Teléfono", longname: "Teléfono", visible: false, type: "text", required: true, maxlength: 255},
                {name: "obj_usertype", shortname: "Tipo", longname: "Tipo de usuario", visible: true, type: "foreign", reference: "usertype", description: "description"}
            ];
        },
        getIcon: function () {
            return "fa-user";
        },
        getObTitle: function () {
            return "usuario";
        },
        getTitle: function () {
            return "user";
        }

    }
})


