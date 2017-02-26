/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

moduloDirectivas.component('calculado', {
    templateUrl: "js/system/components/calculado/calculado.html",
    controllerAs: 'calc',
    bindings: {
        model: '<',
        name: '<',
        longname: '<',
        pattern: '<',
        length: '<',
        required: '<',
        disable: '<'    
    },
    controller: function () {}

});
