'use strict';

moduloDirectivas.directive('plistrpp', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plist/rpp.html'
    };
});
moduloSistema.controller('plistrppController', ['$scope', 'serverService', function ($scope, serverService) {
        $scope.getUrlFromRpp = function (rpp) {
            return "#/" + serverService.getUrlFromParams($scope.$parent.ob, $scope.$parent.op, $scope.$parent.numpage, rpp, $scope.$parent.ufilter, $scope.$parent.uorder);
        }
    }]);