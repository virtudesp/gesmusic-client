moduloDirectivas.component("boolean", {
    templateUrl: 'js/system/components/boolean/boolean.html',
    controller: function boolean() {



    },
    controllerAs: 'bl',
    bindings: {
        parametro: '='

    }



});


/*lo que ponemos en el html que queremos utilizar el checkbox
 <!------------------------------------------------->
 <div ng-show="f.type == 'boolean'" class="form-group">
 <clabel wide="2" name="f.name" longname="f.longname" required="f.required"></clabel>
 <boolean parametro="bean[f.name]"></boolean>
 </div>
 
 <!------------------------------------------------->
 */


/*lo que ponemos en el service.js 
 
 {name: "obj_boolean", shortname: "Boolean", longname: "Boolean", visible: true, type: "boolean", required: false, reference: "cargo", showSelection: true, desc: 'boolean'}
 
 
 */