'use strict';

moduloPrioridad.controller('PrioridadSelectionController', ['$scope', '$uibModalInstance', '$routeParams', 'prioridadService', 'serverService', '$location', 'sharedSpaceService',
    function ($scope, $modalInstance, $routeParams, prioridadService, serverService, $location, sharedSpaceService) {
        
        $scope.fields = prioridadService.getFields();
        $scope.obtitle = prioridadService.getObTitle();
        $scope.icon = prioridadService.getIcon();
        $scope.title = "Selección de " + $scope.obtitle;
        $scope.ob = prioridadService.getTitle();
        $scope.op = "selection";
        $scope.numpage = 1;
        $scope.rpp = 10;
        $scope.neighbourhood = 1;
        $scope.order = "";
        $scope.ordervalue = "";
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";
        $scope.orderParams = null;
        $scope.filterParams = null;
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.closeForm = function (id) {
            $modalInstance.close(id);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
        function getData() {
            serverService.promise_getCount($scope.ob, $scope.filterParams).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterParams, $scope.orderParams);
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.page = response.data.message;
                    $scope.status = "";
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });

        }
        $scope.$on('filterSelectionEvent', function (event, data) {
            $scope.filterParams = data;
            getData();
        });
        $scope.$on('orderSelectionEvent', function (event, data) {
            $scope.orderParams = data;
            getData();
        });
        $scope.$on('pageSelectionEvent', function (event, data) {
            $scope.numpage = data;
            getData();
        });
        $scope.$on('rppSelectionEvent', function (event, data) {
            $scope.rpp = data;
            getData();
        });
        $scope.$on('resetOrderEvent', function (event) {
            $scope.orderParams = null;
            getData();
        });
        $scope.$on('resetFilterEvent', function (event) {
            $scope.filterParams = null;
            getData();
        });
        $scope.chooseOne = function (id) {
            $scope.closeForm(id);
            return false;
        }
        getData();
    }]);