/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * dolity: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & zylkanexy
 * dolity is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

'use strict';

moduloPrueba.controller('PruebaNewController', ['$scope', '$routeParams', '$location', 'serverService', 'pruebaService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, pruebaService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = pruebaService.getFields();
        $scope.obtitle = pruebaService.getObTitle();
        $scope.icon = pruebaService.getIcon();
        $scope.ob = pruebaService.getTitle();
        $scope.title = "Creando " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {id: 0};
        $scope.bean.obj_episodio = {"id": 0};
        $scope.bean.obj_imagen = {"id": 0};
        $scope.bean.obj_analitica = {"id": 0};
        //----
        if ($routeParams.id_episodio) {
            serverService.promise_getOne('episodio', $routeParams.id_episodio).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_episodio = response.data.message;
                    $scope.show_obj_episodio = false;
                    $scope.title = "Nueva prueba del usuario " + $scope.bean.obj_episodio.description;
                }
            });

        } else {
            $scope.show_obj_episodio = true;
        }

        if ($routeParams.id_imagen) {
            serverService.promise_getOne('imagen', $routeParams.id_imagen).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_imagen = response.data.message;
                    $scope.show_obj_imagen = false;
                    $scope.title = "Nueva prueba del usuario " + $scope.bean.obj_imagen.description;
                }
            });
        } else {
            $scope.show_obj_imagen = true;
        }
        if ($routeParams.id_analitica) {
            serverService.promise_getOne('analitica', $routeParams.id_analitica).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_analitica = response.data.message;
                    $scope.show_obj_analitica = false;
                    $scope.title = "Nueva prueba del usuario " + $scope.bean.obj_analitica.description;
                }
            });
        } else {
            $scope.show_obj_analitica = true;
        }
        $scope.save = function () {
            $scope.bean.fecha_peticion = $filter('date')($scope.bean.fecha_peticion, "dd/MM/yyyy");
            $scope.bean.modification = $filter('date')($scope.bean.modification, "dd/MM/yyyy");
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
        $scope.chooseOne = function (nameForeign, foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg'
            }).result.then(function (modalResult) {
                $scope.bean[nameForeign].id = modalResult;
            });
        };
        $scope.$watch('bean.obj_imagen.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('imagen', $scope.bean.obj_imagen.id).then(function (response) {
                    var old_id = $scope.bean.obj_imagen.id;
                    $scope.bean.obj_imagen = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_imagen.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_imagen.$setValidity('exists', false);
                        $scope.bean.obj_imagen.id = old_id;
                    }
                });
            }
        });
        $scope.$watch('bean.obj_episodio.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('episodio', $scope.bean.obj_episodio.id).then(function (response) {
                    var old_id = $scope.bean.obj_episodio.id;
                    $scope.bean.obj_episodio = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_episodio.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_episodio.$setValidity('exists', false);
                        $scope.bean.obj_episodio.id = old_id;
                    }
                });
            }
        });
        $scope.$watch('bean.obj_analitica.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('analitica', $scope.bean.obj_analitica.id).then(function (response) {
                    var old_id = $scope.bean.obj_analitica.id;
                    $scope.bean.obj_analitica = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_analitica.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_analitica.$setValidity('exists', false);
                        $scope.bean.obj_analitica.id = old_id;
                    }
                });
            }
        });

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        //datepicker 1
        $scope.open1 = function () {
            $scope.popup1.opened = true;
            $scope.outerForm.fecha_peticion.$pristine = false;
        };
        $scope.popup1 = {
            opened: false
        };
        //datepicker 2
        $scope.open2 = function () {
            $scope.popup2.opened = true;
            $scope.outerForm.modification.$pristine = false;
        };
        $scope.popup2 = {
            opened: false
        };
    }]);

