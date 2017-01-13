'use strict';
moduloDirectivas.component('cplistrpp', {
    restrict: 'E',
    bindings: {
        ob: '<',
        op: '<',
        numpage: '<',
        rpp: '<',
        orderparams: '<',
        filterparams: '<',
        sfilterparams: '<'
    },
    templateUrl: 'js/system/components/plist/crpp.html',
    controllerAs: 'crpp',
    controller: ['$location', function ($location) {
            var self = this;
            self.repaginate = function (rpp) {
                $location.path(self.ob + '/' + self.op + '/' + self.numpage + '/' + rpp).search('filter', self.filterparams).search('sfilter', self.sfilterparams).search('order', self.orderparams);
                return false;
            };
        }]
});





