'use strict';
moduloDirectivas.component('cplistinfo', {
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
        searchText: '='
    },
    templateUrl: 'js/system/components/plist/cinfo.html',
    controllerAs: 'pi',
    controller: ['serverService', '$location', function (serverService, $location) {
            var self = this;
            self.doresetorder = function () {
                $location.url(self.ob + '/' + self.op + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterParams).search('sfilter', self.sfilterParams);
                return false;
            };


            self.doresetfilter = function () {
                $location.url(self.ob + '/' + self.op + '/' + self.numpage + '/' + self.rpp).search('sfilter', self.sfilterParams).search('order', $routeParams.order);
                return false;
            };


            self.resetClientfilter = function () {
                self.searchText = "";
                return false;
            };
        }]
});





moduloSistema.controller('plistInfoController', ['$scope', 'serverService', '$rootScope', '$location', function ($scope, serverService, $rootScope, $location) {




    }
]);