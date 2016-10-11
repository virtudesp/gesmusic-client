'use strict';

moduloDirectivas.directive('plistfilter', function () { 
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plist/filter.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistFilterController', ['$scope', 'serverService', function ($scope, serverService) {
        //$scope.Fields = $scope.$parent.Fields;
    }]);