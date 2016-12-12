'use strict';


moduloPrioridad.controller('PrioridadViewpopController', ['$scope', '$routeParams', 'serverService', 'prioridadService', '$location', '$uibModalInstance', 'id',
    function ($scope, $routeParams, serverService, prioridadService, $location, $uibModalInstance, id) {
        $scope.fields = prioridadService.getFields();
        $scope.obtitle = prioridadService.getObTitle();
        $scope.icon = prioridadService.getIcon();
        $scope.ob = prioridadService.getTitle();
        $scope.title = "Vista de " + $scope.obtitle;
        $scope.id = id;
        $scope.status = null;
        $scope.debugging=serverService.debugging();
        serverService.promise_getOne($scope.ob, $scope.id).then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    $scope.status = null;
                    $scope.bean = response.data.message;
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }]);