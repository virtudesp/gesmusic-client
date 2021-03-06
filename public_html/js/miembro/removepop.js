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


moduloMiembro.controller('MiembroRemovepopController', ['$scope', '$routeParams', 'serverService', 'miembroService', '$location', '$uibModalInstance', 'id',
    function ($scope, $routeParams, serverService, miembroService, $location, $uibModalInstance, id) {
        $scope.fields = miembroService.getFields();
        $scope.obtitle = miembroService.getObTitle();
        $scope.icon = miembroService.getIcon();
        $scope.ob = miembroService.getTitle();
        $scope.title = "Borrando un " + $scope.obtitle;
        $scope.id = id;
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        function getData() {
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
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.remove = function () {
            serverService.promise_removeOne($scope.ob, $scope.id).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        if (response.data.message == 1) {
                            $scope.status = "El registro " + $scope.obtitle + " se ha eliminado.";
                            $uibModalInstance.close(true);
                            getData();
                            return false;
                        } else {
                            $scope.status = "Error en el borrado de datos del servidor 1";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor 2";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor 3";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor 4";
            });
        }
        getData();
    }]);