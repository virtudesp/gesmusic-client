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

moduloElenco.controller('ElencoNewController', ['$scope', '$routeParams', '$location', 'serverService', 'elencoService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, elencoService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = elencoService.getFields();
        $scope.obtitle = elencoService.getObTitle();
        $scope.icon = elencoService.getIcon();
        $scope.ob = elencoService.getTitle(); //elenco
//        $scope.title = "Nuevo miembro de la agrupación";
        $scope.op = "new";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        //// para los campos miembro y rol
        $scope.bean = {};
        //---
        $scope.bean.obj_miembro = {"id": 0};
        if ($routeParams.id_miembro) {
            serverService.promise_getOne('miembro', $routeParams.id_miembro).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_miembro = response.data.message;
                    $scope.show_obj_miembro = false;
                    $scope.title = "Nuevo componente del elenco: " + $scope.bean.obj_miembro.miembro;
                }
            });
        } else {
            $scope.show_obj_miembro = true;
        }
        //---
        $scope.bean.obj_rol = {"id": 0};
        if ($routeParams.id_rol) {
            serverService.promise_getOne('rol', $routeParams.id_rol).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_rol = response.data.message;
                    $scope.show_obj_rol = false;
                    $scope.title = "Nuevo componente del elenco: " + $scope.bean.obj_rol.rol;
                }
            });
        } else {
            $scope.show_obj_rol = true;
        }
        //---
        // id de la agrupación que viene como parámetro
        $scope.foreign = $routeParams.id;
        $scope.foreignbean = {};
        $scope.foreignbean.id = 0;
        serverService.promise_getOne('agrupacion', $scope.foreign).then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    $scope.status = null;
                    $scope.foreignbean = response.data.message;
                    $scope.title = "Nuevo miembro de la " + $scope.foreignbean.agrupacion;
                } else {
                    $scope.status = "Error en la recepción de datos del servidor1";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor2";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor3";
        });//               
        //-----
        $scope.save = function () {
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha creado con id = " + response.data.message;
                        $scope.bean.id = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor1";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor2";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor3";
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
            window.history.back();
//            $location.path('/elenco/plist');
        };
//        $scope.chooseOne = function (nameForeign, foreignObjectName, contollerName) {
//            var modalInstance = $uibModal.open({
//                templateUrl: 'js/' + foreignObjectName + '/selection.html',
//                controller: contollerName,
//                size: 'lg'
//            }).result.then(function (modalResult) {
//                $scope.bean[nameForeign].id = modalResult;
//            });
//        };
//        $scope.$watch('bean.obj_miembro.id', function () {
//            if ($scope.bean) {
//                serverService.promise_getOne('miembro', $scope.bean.obj_miembro.id).then(function (response) {
//                    var old_id = $scope.bean.obj_miembro.id;
//                    $scope.bean.obj_miembro = response.data.message;
//                    if (response.data.message.id != 0) {
//                        $scope.outerForm.obj_miembro.$setValidity('exists', true);
//                    } else {
//                        $scope.outerForm.obj_miembro.$setValidity('exists', false);
//                        $scope.bean.obj_miembro.id = old_id;
//                    }
//                });
//            }
//        });
    }]);

