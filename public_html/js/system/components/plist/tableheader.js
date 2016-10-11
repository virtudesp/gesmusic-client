'use strict';

moduloDirectivas.directive('plistheader', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/components/plist/tableheader.html'
    };
});

moduloSistema.controller('plistheaderController', ['$scope', 'serverService', function ($scope, serverService) {
//        $scope.Fields = $scope.$parent.Fields;
//        $scope.dosort = $scope.$parent.dosort;
    }]);