/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

moduloDirectivas.component("componentenumero", {
    templateUrl: 'js/system/components/numeros/numero.html',
    controllerAs: 'n',
    bindings: {
        decimalnumber: '=',
        name: '<',
        maxlength: '<',
        pattern: '<',
        required: '<'
    },
    controller: function () {
        console.log(this);
    }
})