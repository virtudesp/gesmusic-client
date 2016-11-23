'use strict';
moduloServicios.factory('userService', function () {
    return {
        getFields: function () {
            return [
                {name: "id", shortname: "ID", longname: "Identificador", visible: true},
                {name: "name", shortname: "Nombre", longname: "Nombre", visible: true},
                {name: "surname", shortname: "Apellidos", longname: "Apellidos", visible: true},
                {name: "login", shortname: "Login", longname: "Login", visible: true},
                {name: "password", shortname: "Password", longname: "Password", visible: false},
                {name: "address", shortname: "Dirección", longname: "Dirección", visible: false},
                {name: "city", shortname: "Ciudad", longname: "Ciudad", visible: false},
                {name: "zip", shortname: "Cód.Postal", longname: "Cód.Postal", visible: false},
                {name: "state", shortname: "Provincia", longname: "Provincia", visible: false},
                {name: "country", shortname: "País", longname: "País", visible: false},
                {name: "email", shortname: "Email", longname: "Email", visible: false},
                {name: "phone", shortname: "Teléfono", longname: "Teléfono", visible: false},
                {name: "obj_usertype", shortname: "Tipo", longname: "Tipo de usuario", visible: true, reference: "usertype", description: "description"}
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


