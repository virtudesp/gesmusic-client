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

moduloArchivo.controller('ArchivoNewController', ['$scope', '$routeParams', '$location', 'serverService', 'archivoService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, archivoService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = archivoService.getFields();
        $scope.obtitle = archivoService.getObTitle();
        $scope.icon = archivoService.getIcon();
        $scope.ob = archivoService.getTitle();
        $scope.title = "Añadir una obra al Archivo";
        $scope.op = "new";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        //----
        $scope.bean.obj_obra = {"id": 0};
        if ($routeParams.id_obra) {
            serverService.promise_getOne('obra', $routeParams.id_obra).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_obra = response.data.message;
                    $scope.show_obj_obra = false;
                    $scope.title = "Nuevo registro del archivo";
                }
            });
        } else {
            $scope.show_obj_obra = true;
        }
        //-----
        $scope.save = function () {
            $scope.bean.alta = $filter('date')($scope.bean.fecha_alta, "dd/MM/yyyy");
            if ($scope.bean.obj_obra.id <= 0) {
                $scope.bean.obj_obra.id = null;
            }
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
    }]);

