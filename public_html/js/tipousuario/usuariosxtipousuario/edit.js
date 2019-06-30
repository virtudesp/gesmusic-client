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
moduloUsuario.controller('UsuariosXTipousuarioEditController', ['$scope', '$routeParams', '$location', 'usuarioService', 'serverService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, usuarioService, serverService, sharedSpaceService, $filter, $uibModal) {
        // parámetros en la url
        $scope.id = $routeParams.id; // id del usuario
        $scope.foreign = $routeParams.foreign; // id del tipousuario
//        $scope.tipousuario = $routeParams.tipousuario;
        //-------
        $scope.fields = usuarioService.getFields();
        $scope.obtitle = usuarioService.getObTitle();
        $scope.icon = usuarioService.getIcon();
        $scope.ob = usuarioService.getTitle();
        $scope.title = "Editando un usuario del tipo: " + $scope.tipousuario;
        $scope.op = "edit";
        $scope.status = null;
//        $scope.debugging = serverService.debugging();
        $scope.urlplist ="tipousuario/usuariosxtipousuario/plist/" + $scope.foreign;
        $scope.bean = {};
        $scope.bean.id = $routeParams.id;
        $scope.bean.id_tipousuario = $routeParams.foreign;  // añadido
        //--- Obtenemos los datos de la usuario
        serverService.promise_getOne($scope.ob, $scope.id).then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    $scope.status = null;
                    $scope.bean = response.data.message;
                } else {
                    $scope.status = "Error en la recepción de datos del servidor1";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor2";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor3";
        });
        // Guardamos los cambios
        $scope.save = function () {            
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOneXIdXForeign($scope.ob, $scope.id, $scope.foreign, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El usuario se ha modificado ... id = " + $scope.bean.id;
                        $scope.bean.id = $scope.bean.id;
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
            $location.path($scope.urlplist);
        };
    }]);