'use strict';
moduloEpisodio.factory('episodioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id", showSelection: true},
                    {name: "fecha", shortname: "Fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: "", showSelection: true},
                    {name: "informe", shortname: "Informe", longname: "Informe", visible: false, type: "textarea", required: true, maxlength: 5000, pattern: "", showSelection: false},
                    {name: "importe", shortname: "Importe", longname: "Importe", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr('decimal'), help: serverService.getRegExpl('decimal'), showSelection: false},
                    {name: "obj_importancia", shortname: "Importancia", longname: "Importancia", visible: true, required: true, howSelection: true, type: "foreign", reference: "importancia", descforeign: "descripcion"},
                    {name: "obj_servicio", shortname: "Servicio", longname: "Servicio", visible: true, required: true, showSelection: true, desc: 'descripcion', nullable: true, type: "foreign", reference: "servicio", descforeign: "descripcion"},
                    {name: "obj_tipo", shortname: "Tipo", longname: "Tipo", visible: true, required: true, showSelection: true, desc: 'descripcion', type: "foreign", reference: "tipo", descforeign: "descripcion"},
                    {name: "obj_paciente", shortname: "Paciente", longname: "Paciente", visible: false, required: false, showSelection: true, type: "foreign", reference: "paciente", descforeign: "primer_apellido"}, //desc: ['name', 'primer_apellido']
                    {name: "obj_medico", shortname: "Medico", longname: "Medico", visible: true, required: false, showSelection: true, type: "foreign", reference: "medico", descforeign: "id"},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, required: false, showSelection: true, type: "foreign", reference: "episodio", descforeign: "fecha"},
                    {name: "obj_cargo", shortname: "Cargo", longname: "Cargo", visible: false, required: false, showSelection: true, type: "foreign", reference: "cargo", descforeign: "date"},
                    {name: "archivado", shortname: "Archivado", longname: "Archivado", visible: true, type: "boolean", required: false, showSelection: true, desc: 'boolean'}
                ];
            },
            getIcon: function () {
                return "fa-file-text-o";
            },
            getObTitle: function () {
                return "episodio";
            },
            getTitle: function () {
                return "episodio";
            }
        };
    }]);


