'use strict';


moduloTecnica.controller('TecnicaRemovepopController', ['$scope', '$routeParams', 'serverService', 'tecnicaService', '$location', '$uibModalInstance', 'id',
    function ($scope, $routeParams, serverService, tecnicaService, $location, $uibModalInstance, id) {

        $scope.fields = tecnicaService.getFields();
        $scope.obtitle = tecnicaService.getObTitle();
        $scope.icon = tecnicaService.getIcon();
        $scope.ob = tecnicaService.getTitle();
        $scope.title = "Borrado de " + $scope.obtitle;
        $scope.id = id;
        $scope.status = null;
        $scope.debugging = serverService.debugging();

        function getData() {
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
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.remove = function () {
            serverService.promise_removeOne($scope.ob, $scope.id).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        if (response.data.message == 1) {
                            $scope.status = "El registro " + $scope.obtitle + " se ha eliminado.";
                            $uibModalInstance.close(true);
                            getData();
                            return false;
                        } else {
                            $scope.status = "Error en el borrado de datos del servidor";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
        }
        getData();
    }]);