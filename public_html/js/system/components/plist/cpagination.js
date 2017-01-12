'use strict';
moduloDirectivas.component('cplistpagination', {
    restrict: 'E',
    bindings: {
        ob: '<',
        op: '<',
        numpage: '<',
        rpp: '<',
        pages: '<',
        neighbourhood: '<',
        filterParams: '<',
        orderParams: '<',
        sfilterParams: '<'
    },
    templateUrl: 'js/system/components/plist/cpagination.html',
    controllerAs: 'pf',
    controller: ['serverService', '$location', function (serverService, $location) {
            var self = this;
            self.gotopage = function (numpage) {
                self.numpage = numpage;
                $location.path(self.ob + '/' + self.op + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterParams).search('sfilter', self.sfilterParams).search('order', self.orderParams);
                return false;
            };
            self.getRangeArray = serverService.getRangeArray;
            self.evaluateMin = serverService.evaluateMin;
            self.evaluateMax = serverService.evaluateMax;
        }]
});
