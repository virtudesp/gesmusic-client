'use strict';

moduloDirectivas.directive('plist', function () { 
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plist/plist.html'
    };
});

moduloSistema.controller('plistController', ['$scope', '$routeParams', 'serverService', '$location',
    function ($scope, $routeParams, serverService, $location) {

        $scope.resetorder = function () {
            $scope.uorder = [];
            var ruta = $scope.ob + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp;
            ruta += "/" + serverService.getParamString($scope.ufilter);
            ruta += "/" + serverService.getParamString($scope.uorder);
            $location.path(ruta);
            return false;
        };
        $scope.resetfilter = function () {
            $scope.ufilter = [];
            $location.path(serverService.getUrlFromParams($scope.ob, $scope.op, $scope.numpage, $scope.rpp, $scope.ufilter, $scope.uorder));
            return false;
        };
        $scope.resetClientfilter = function () {
            $scope.searchText = "";
            return false;
        };

        $scope.dofilter = function () {
            if ($scope.filter != "" && $scope.filteroperator != "" && $scope.filtervalue != "") {
                $scope.ufilter1 = [];
                $scope.ufilter1.push(new Array($scope.filter, $scope.filteroperator, $scope.filtervalue));
                $scope.ufilter.push($scope.ufilter1);
                $location.path(serverService.getUrlFromParams($scope.ob, $scope.op, $scope.numpage, $scope.rpp, $scope.ufilter, $scope.uorder));
            }
            return false;
        };
        $scope.dosort = function (field, direction) {
            $scope.uorder = [];
            $scope.uorder.push(new Array(field, direction));
            $location.path(serverService.getUrlFromParams($scope.ob, $scope.op, $scope.numpage, $scope.rpp, $scope.ufilter, $scope.uorder));
            return false;
        };
    }]);