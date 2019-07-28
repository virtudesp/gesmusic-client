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

moduloUsuario.controller('UsuarioNewController', ['$scope', '$routeParams', '$location', 'serverService', 'usuarioService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, usuarioService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = usuarioService.getFields(true);
        $scope.obtitle = usuarioService.getObTitle();
        $scope.icon = usuarioService.getIcon();
        $scope.ob = usuarioService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "new";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        // para el select del tipusuario
        $scope.bean = {};
//        $scope.bean2 = {};
//        $scope.bean2.id = 0;
        //----
        $scope.bean.obj_tipousuario = {"id": 0};
        if ($routeParams.id_tipousuario) {
            serverService.promise_getOne('tipousuario', $routeParams.id_tipousuario).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_tipousuario = response.data.message;
                    $scope.show_obj_tipousuario = false;
                }
            });
        } else {
            $scope.show_obj_tipousuario = true;
        }
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
            $location.path('/' + $scope.ob + '/plist');
        };
//
//        $scope.chooseOne = function () {
//            var modalInstance = $uibModal.open({
//                templateUrl: 'js/tipousuario/selection.html',
//                controller: "TipousuarioSelectionController",
//                size: 'lg'
//            }).result.then(function (modalResult) {
//                $scope.change(modalResult);
//            });
//        };
//
//        $scope.change = function (id) {
//            if (!$scope.required && (id <= 0 || id === "" || id === undefined)) {
//                $scope.bean2.id = null;
//
//                validity(true);
//                return;
//            }
//            if ($scope.bean2) {
//                serverService.promise_getOne($scope.reference, id).then(function (response) {
//                    var old_id = id;
//                    $scope.bean2 = response.data.message;
//                    if (response.data.message.id <= 0) {
//                        validity(false);
//                        $scope.bean2.id = old_id;
//                    } else {
//
//                        validity(true);
//                        if (Array.isArray($scope.description)) {
//
//                            $scope.desc = "";
//                            for (var d in $scope.description) {
//                                $scope.desc += $scope.bean2[$scope.description[d]] + " ";
//                            }
//                        } else {
//                            $scope.desc = $scope.bean2[$scope.description];
//                        }
//                    }
//                }).catch(function (data) {
//                    validity(false);
//                });
//            }
//        };
//
//        var validity = function (isValid) {
//            if ($scope.form) {
//                $scope.form[$scope.name].$setValidity('exists', isValid);
//            }
//        };
//


    }]);

