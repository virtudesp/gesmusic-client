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

moduloZonaimagen.controller('ZonaimagenNewController', ['$scope', '$routeParams', '$location', 'serverService', 'zonaimagenService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, zonaimagenService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = zonaimagenService.getFields();
        $scope.obtitle = zonaimagenService.getObTitle();
        $scope.icon = zonaimagenService.getIcon();
        $scope.ob = zonaimagenService.getTitle();
        $scope.title = "Creando " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {id: 0};
        $scope.bean.obj_zona = {"id": 0};
        $scope.bean.obj_imagen = {"id": 0};
        //----
        if ($routeParams.id_zona) {
            serverService.promise_getOne('zona', $routeParams.id_zona).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_zona = response.data.message;
                    $scope.show_obj_zona = false;
                    $scope.title = "Nueva zonaimagen " + $scope.bean.obj_user.description;
                }
            });
        } else {
            $scope.show_obj_zona = true;
        }
        //----
        if ($routeParams.id_imagen) {
            serverService.promise_getOne('imagen', $routeParams.id_imagen).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_imagen = response.data.message;
                    $scope.show_obj_imagen = false;
                    $scope.title = "Nueva zonaimagen " + $scope.bean.obj_user.description;
                }
            });
        } else {
            $scope.show_obj_imagen = true;
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
        $scope.chooseOne = function (nameForeign, foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg'
            }).result.then(function (modalResult) {
                $scope.bean[nameForeign].id = modalResult;
            });
        };
        $scope.$watch('bean.obj_zona.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('zona', $scope.bean.obj_zona.id).then(function (response) {
                    var old_id = $scope.bean.obj_zona.id;
                    $scope.bean.obj_zona = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_zona.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_zona.$setValidity('exists', false);
                        $scope.bean.obj_zona.id = old_id;
                    }
                });
            }
        });

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

    }]);

