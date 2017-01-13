'use strict';
moduloDiagnostico.factory('diagnosticoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "fecha", shortname: "fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, type: "specific", reference: "episodio"},
                    {name: "obj_tipodiagnostico", shortname: "tipo diagnostico", longname: "Tipo de diagnostico", visible: true, type: "specific", reference: "tipodiagnostico"}

                ];
            },
            getIcon: function () {
                return "fa-list-alt";
            },
            getObTitle: function () {
                return "diagnostico";
            },
            getTitle: function () {
                return "diagnostico";
            }
        };
    }]);


