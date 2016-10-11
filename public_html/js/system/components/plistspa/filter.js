'use strict';

moduloDirectivas.directive('plistfilterspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plistspa/filter.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistFilterspaController', ['$scope', 'serverService', '$rootScope', function ($scope, serverService, $rootScope) {
        //$scope.Fields = $scope.$parent.Fields;
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";
        $scope.doFilterSelection = function ()
        {
            $scope.ufilter = [];
            $scope.ufilter.push([$scope.filter, $scope.filteroperator, $scope.filtervalue])
            $rootScope.$broadcast('filterSelectionEvent',$scope.ufilter);
        }
    }]);