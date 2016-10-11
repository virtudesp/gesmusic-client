'use strict';

moduloDirectivas.directive('plistspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plistspa/plist.html'
    };
});

moduloSistema.controller('plistspaController', ['$scope', '$routeParams', 'serverService', '$location',
    function ($scope, $routeParams, serverService, $location) {
        $scope.ufilter = null;
        $scope.chooseOne = function (id) {
            //alert(id);
            $scope.$parent.closeForm(id);
            return false;
        }

        $scope.resetorderSelection = function ()
        {
            $scope.uorder = [];
            $rootScope.$broadcast('orderSelectionEvent', $scope.uorder);
            return false;
        }

    }]);