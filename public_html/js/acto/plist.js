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

moduloActo.controller('ActoPListController', ['$scope', '$routeParams', '$location', 'serverService', 'actoService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, actoService, $uibModal) {
        $scope.fields = actoService.getFields();
        $scope.obtitle = actoService.getObTitle();
        $scope.icon = actoService.getIcon();
        $scope.ob = actoService.getTitle();
        $scope.title = "Listado de actos";
        $scope.op = "plist";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(25, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.url = $scope.ob + '/' + $scope.op;
        // parámetro que viene en la url para el historial de actos de una obra
//        $scope.foreign = $routeParams.id;
        // comodín para mostrar o no información de la obra en la cabecera
//        $scope.historial = false;
        // Si no hay parámetro, se trata del listado normal de actos
//        if ($scope.foreign == null) {
//        if ($scope.foreign > 0) {
//            $scope.title = "Historial de interpretaciones";
//            $scope.foreignob = "acto";
//            $scope.historial = true;
//        } else {
//            $scope.title = "Listado de actos";
//        }
        // url para la relacion N:M --> participacion 
        $scope.urlparticipa = 'participa/plist';
        // Para guardar los datos de la obra y mostrarlos en la cabecera
        $scope.foreignbean = {};
        $scope.foreignbean.id = 0;
        $scope.foreignob2 = "obra";
        //---------------
        function getDataFromServer() {
            // obtener los datos de la obra
//            serverService.promise_getOne($scope.foreignob2, $scope.foreign).then(function (response) {
//                if (response.status == 200) {
//                    if (response.data.status == 200) {
//                        $scope.status = null;
//                        $scope.foreignbean = response.data.message;
//                    } else {
//                        $scope.status = "Error en la recepción de datos del servidor1";
//                    }
//                } else {
//                    $scope.status = "Error en la recepción de datos del servidor2";
//                }
//            }).catch(function (data) {
//                $scope.status = "Error en la recepción de datos del servidor3";
//            });
            //-------            
//            if ($scope.foreign == null) {
                // listado normal de actos
                serverService.promise_getCount($scope.ob, $scope.filterExpression).then(function (response) {
                    if (response.status == 200) {
                        $scope.registers = response.data.message;
                        $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                        if ($scope.numpage > $scope.pages) {
                            $scope.numpage = $scope.pages;
                        }
                        return serverService.promise_getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor1";
                    }
                }).then(function (response) {
                    if (response.status == 200) {
                        $scope.page = response.data.message;
                        $scope.status = "";
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor2";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor3";
                });
//            } else {
//                // historial de actos de una obra
//                serverService.promise_getCountXId($scope.foreignob, $scope.foreign, $scope.filterExpression).then(function (response) {
//                    if (response.status == 200) {
//                        $scope.registers = response.data.message;
//                        $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
//                        if ($scope.numpage > $scope.pages) {
//                            $scope.numpage = $scope.pages;
//                        }
//                        return serverService.promise_getPageXId($scope.foreignob, $scope.foreign, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
//                    } else {
//                        $scope.status = "Error en la recepción de datos del servidor1";
//                    }
//                }).then(function (response) {
//                    if (response.status == 200) {
//                        $scope.page = response.data.message;
//                        $scope.status = "";
//                    } else {
//                        $scope.status = "Error en la recepción de datos del servidor2";
//                    }
//                }).catch(function (data) {
//                    $scope.status = "Error en la recepción de datos del servidor3";
//                });
//            }
        }
        $scope.pop = function (id, foreignObjectName, foreignContollerName, foreignViewName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/' + foreignViewName + '.html',
                controller: foreignContollerName,
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            }).result.then(function (modalResult) {
                if (modalResult) {
                    getDataFromServer();
                }

            });
        };
        getDataFromServer();
    }]);


