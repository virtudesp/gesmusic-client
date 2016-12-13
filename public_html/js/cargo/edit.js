'use strict';

moduloCargo.controller('CargoEditController', ['$scope', '$routeParams', '$location', 'usuarioService', 'serverService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, usuarioService, serverService, sharedSpaceService, $filter, $uibModal) {
        
        $scope.fields = usuarioService.getFields();
        $scope.obtitle = usuarioService.getObTitle();
        $scope.icon = usuarioService.getIcon();
        $scope.ob = usuarioService.getTitle();
        $scope.title = "Editando un " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.error = true;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        //---
        $scope.bean.obj_id_documento = {"id": null};
        $scope.show_obj_id_documento = true;
        //---
        $scope.bean.obj_id_episodio = {"id": null};
        $scope.show_obj_id_episodio = true;
        //---
        $scope.id = $routeParams.id;
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
        $scope.save = function () {
            $scope.bean.creation = $filter('date')($scope.bean.creation, "dd/MM/yyyy");
            $scope.bean.modification = $filter('date')($scope.bean.modification, "dd/MM/yyyy");
            if (!$scope.bean.obj_medico.id > 0) {
                $scope.bean.obj_medico.id = null;
            }
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha modificado ... id = " + $scope.bean.id;
                        $scope.bean.id = $scope.bean.id;
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
        $scope.chooseOne = function (nameForeign, foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg'
            }).result.then(function (modalResult) {
                $scope.bean[nameForeign].id = modalResult;
            });
        };
        $scope.$watch('bean.obj_id_documento.id', function () {
            if ($scope.bean) {
                if ($scope.bean.obj_tipousuario.id) {
                    serverService.promise_getOne('documento', $scope.bean.obj_tipousuario.id).then(function (response) {
                        var old_id = $scope.bean.obj_tipousuario.id;
                        if (response.data.message.id != 0) {
                            $scope.outerForm.obj_tipousuario.$setValidity('exists', true);
                            $scope.bean.obj_tipousuario = response.data.message;
                        } else {
                            $scope.outerForm.obj_tipousuario.$setValidity('exists', false);
                            //$scope.bean.obj_tipousuario.id = 0;
                            $scope.bean.obj_tipousuario.id = old_id;
                        }
                    });
                }
            }
        });
    }]);