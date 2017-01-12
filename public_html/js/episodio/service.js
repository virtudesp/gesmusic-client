'use strict';
moduloEpisodio.factory('episodioService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id",showSelection: true},
                    {name: "fecha", shortname: "Fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: "",showSelection: true},
                    {name: "informe", shortname: "Informe", longname: "Informe", visible: true, type: "textarea", required: true, maxlength: 5000, pattern: "",showSelection: false},
                    {name: "importe", shortname: "Importe", longname: "Importe", visible: true, type: "text", required: true, maxlength: 255, pattern: serverService.getRegExpr('decimal'),help:serverService.getRegExpl('decimal'),showSelection: false},
                    {name: "obj_importancia", shortname: "Importancia", longname: "Importancia", visible: true, type: "specific", required: true, reference:"importancia",showSelection: true,desc:'descripcion'},
                    {name: "obj_servicio", shortname: "Servicio", longname: "Servicio", visible: true, type: "specific", required: true, reference:"servicio",showSelection: true,desc:'descripcion',nullable:true},
                    {name: "obj_tipo", shortname: "Tipo", longname: "Tipo", visible: true, type: "specific", required: true, reference:"tipo",showSelection: true,desc:'descripcion'},
                    {name: "obj_paciente", shortname: "Paciente", longname: "Paciente", visible: true, type: "specific", required: false, reference:"paciente",showSelection: true,desc:['name','primer_apellido']},
                    {name: "obj_medico", shortname: "Medico", longname: "Medico", visible: true, type: "specific", required: false, reference:"medico",showSelection: true,desc:'id'},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, type: "specific", required: false, reference:"episodio",showSelection: true,desc:'fecha'},                    
                    {name: "obj_cargo", shortname: "Cargo", longname: "Cargo", visible: true, type: "specific", required: false, reference:"cargo",showSelection: true,desc:'date'}                    
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


