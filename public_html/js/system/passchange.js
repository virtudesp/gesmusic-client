'use strict';
moduloSistema.controller('PasschangeController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Formulario de cambio de password";
        $scope.icon = "fa-key";
        $scope.user = {};
        if (serverService.debugging()) {
            $scope.old = '';
            $scope.new = '';
        }
        $scope.passchange = function () {
            serverService.getPasswordChangePromise($scope.old, $scope.new).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.result = response.data.message;
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
    }]);


