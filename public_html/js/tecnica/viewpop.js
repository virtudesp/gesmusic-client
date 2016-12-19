'use strict';


moduloTecnica.controller('TecnicaViewpopController', ['$scope', '$routeParams', 'serverService', 'tecnicaService', '$location', '$uibModalInstance', 'id',
    function ($scope, $routeParams, serverService, tecnicaService, $location, $uibModalInstance, id) {
        $scope.fields = tecnicaService.getFields();
        $scope.obtitle = tecnicaService.getObTitle();
        $scope.icon = tecnicaService.getIcon();
        $scope.ob = tecnicaService.getTitle();
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