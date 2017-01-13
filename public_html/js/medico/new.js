/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * sisane: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
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

moduloMedico.controller('MedicoNewController', ['$scope', '$routeParams', '$location', 'serverService', 'medicoService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, medicoService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = medicoService.getFields();
        $scope.obtitle = medicoService.getObTitle();
        $scope.icon = medicoService.getIcon();
        $scope.ob = medicoService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {id: 0};
        $scope.bean.obj_servicio = {"id": 0};
        $scope.bean.obj_especialidad = {"id": 0};
        //----
        $scope.bean.obj_servicio = {"id": 0};
        if ($routeParams.id_servicio) {
            serverService.promise_getOne('servicio', $routeParams.id_servicio).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_servicio = response.data.message;
                    $scope.show_obj_servicio = false;
                    $scope.title = "Nuevo médico del servicio" + $scope.bean.obj_servicio.descripcion;
                }
            });
        } else {
            $scope.show_obj_servicio = true;
        }
        //----
        $scope.bean.obj_especialidad = {"id": 0};
        if ($routeParams.id_especialidad) {
            serverService.promise_getOne('especialidad', $routeParams.id_especialidad).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_especialidad = response.data.message;
                    $scope.show_obj_especialidad = false;
                    $scope.title = "Nuevo médico del especialidad" + $scope.bean.obj_especialidad.descripcion;
                }
            });
        } else {
            $scope.show_obj_especialidad = true;
        }

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

        $scope.$watch('bean.obj_servicio.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('servicio', $scope.bean.obj_servicio.id).then(function (response) {
                    var old_id = $scope.bean.obj_servicio.id;
                    $scope.bean.obj_servicio = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_servicio.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_servicio.$setValidity('exists', false);
                        $scope.bean.obj_servicio.id = old_id;
                    }
                });
            }
        });

        $scope.$watch('bean.obj_especialidad.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('especialidad', $scope.bean.obj_especialidad.id).then(function (response) {
                    var old_id = $scope.bean.obj_especialidad.id;
                    $scope.bean.obj_especialidad = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_especialidad.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_especialidad.$setValidity('exists', false);
                        $scope.bean.obj_especialidad.id = old_id;
                    }
                });
            }
        });
    }]);

