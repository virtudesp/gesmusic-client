'use strict';
moduloDirectivas.component('cplistfilter', {
    restrict: 'E',
    bindings: {
        ob: '<',
        op: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',         
        order: '<',
        sfilter: '<'
    },
    templateUrl: 'js/system/components/plist/cfilter.html',
    controllerAs: 'cf',
    controller: ['serverService', '$location', function (serverService, $location) {
            var self = this;
            self.dofilter = function ()
            {
                if (self.filter && self.filteroperator && self.filtervalue) {
                    if (self.filterParams) {
                        self.filterExpression = self.filterParams + '+and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
                    } else {
                        self.filterExpression = 'and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
                    }
                    $location.path(self.ob + '/' + self.op + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterExpression).search('sfilter', $routeParams.sfilter).search('order', $routeParams.order);
                }
                return false;
            }
        }]
});


