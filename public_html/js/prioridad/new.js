'use strict';

moduloPrioridad.controller('PrioridadNewController', ['$scope', '$routeParams', '$location', 'serverService', 'prioridadService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, prioridadService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = prioridadService.getFields();
        $scope.obtitle = prioridadService.getObTitle();
        $scope.icon = prioridadService.getIcon();
        $scope.ob = prioridadService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        //$scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.bean.id = 0;    
          
        $scope.save = function () {         
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha creado con id = " + response.data.message;
                        $scope.bean.id = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
            ;
        };
        $scope.back = function () {
            window.history.back();
        };
        $scope.close = function () {
            $location.path('/home');
        };
        $scope.plist = function () {
            $location.path('/' + $scope.ob + '/plist');
        };
       
    }]);

