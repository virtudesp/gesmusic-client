/*
 * Copyright (c) 2019 by Virtudes Planells Tatay
 *
 * sisane: The stunning micro-library that helps you to develop easily
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/virtudesp/
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
moduloObra.controller('ObrasXCompositorEditController', ['$scope', '$routeParams', '$location', 'obraService', 'serverService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, obraService, serverService, sharedSpaceService, $filter, $uibModal) {
        // parámetros en la url
        $scope.id = $routeParams.id; // id de la obra
        //-------
        $scope.fields = obraService.getFields(false);
        $scope.obtitle = obraService.getObTitle();
        $scope.icon = obraService.getIcon();
        $scope.ob = obraService.getTitle();
        $scope.title = "Editando una obra";
        $scope.op = "edit";
        $scope.status = null;
        $scope.urlplist = "compositor/obrasxcompositor/plist/" + $scope.foreign;
        // para los datos de la obra
        $scope.bean = {};
        $scope.bean.id = $routeParams.id;
        // Para guardar los datos del compositor y mostrarlos en la cabecera
        $scope.foreign = $routeParams.foreign; // id del compositor
        $scope.foreignbean = {};
        $scope.foreignbean.id = 0;
        $scope.foreignob = "compositor";
        //-------
        function getDataFromServer() {
            // obtener los datos del compositor
            serverService.promise_getOne($scope.foreignob, $scope.foreign).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.foreignbean = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor1";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor2";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor3";
            });
            //--- Obtenemos los datos de la obra
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
        }
        // Guardamos los cambios
        $scope.save = function () {
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOneXIdXForeign($scope.ob, $scope.id, $scope.foreign, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "La obra se ha modificado ... id = " + $scope.bean.id;
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
        getDataFromServer();
        $scope.back = function () {
            window.history.back();
        };
        $scope.close = function () {
            $location.path('/home');
        };
        $scope.plist = function () {
//            $location.path('/' + $scope.ob + '/plist');
            $location.path($scope.urlplist);
        };
    }]);