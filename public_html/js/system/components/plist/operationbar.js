'use strict';

moduloDirectivas.directive('plistoperationbar', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/components/plist/operationbar.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistoperationbarController', ['$scope', 'serverService', function ($scope, serverService) {
//        $scope.ob = $scope.$parent.ob;
//        $scope.obj = $scope.$parent.obj;

   


    }]);