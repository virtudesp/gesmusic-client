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

moduloRepertorio.controller('RepertorioPListController', ['$scope', '$routeParams', '$location', 'serverService', 'repertorioService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, repertorioService, $uibModal) {
//        $scope.fields = repertorioService.getFields(true);
        $scope.fields = repertorioService.getFieldsObra(true);
        $scope.obtitle = repertorioService.getObTitle();
        $scope.icon = repertorioService.getIcon();
        $scope.ob = repertorioService.getTitle();
        $scope.title = "Repertorio ";
        $scope.op = "plist";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(10, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        {
//        $scope.order = "";
//        $scope.ordervalue = "";
//        $scope.filter = "id";
//        $scope.filteroperator = "like";
//        $scope.filtervalue = "";
//        $scope.filterParams = serverService.checkNull($routeParams.filter)
//        $scope.orderParams = serverService.checkNull($routeParams.order)
//        $scope.sfilterParams = serverService.checkNull($routeParams.sfilter)
//        $scope.filterExpression = serverService.getFilterExpression($routeParams.filter, $routeParams.sfilter);
        }
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.url = $scope.ob + '/' + $scope.op;
        // urls para la relacion N:M --> repertorio 
//        $scope.urlrepertorio = 'repertorio/plist';
        $scope.urlnew = "repertorio/new";
        $scope.urledit = "repertorio/edit";
        // url para volver al listado de actos
        $scope.urlplist = "acto/plist";
        // datos enviados en la url
        $scope.foreign = $routeParams.foreign; // id del acto
        $scope.foreign2 = $routeParams.foreign2; // id de la agrupación
        // Para guardar los datos del acto y mostrarlos en la cabecera
        $scope.foreignbean = {};
        $scope.foreignbean.id = 0;
        $scope.foreignob = "acto";
        // Para guardar los datos de la agrupación y mostrarlos en la cabecera
        $scope.foreignbean2 = {};
        $scope.foreignbean2.id = 0;
        $scope.foreignob2 = "agrupacion";
        // Para guardar los datos de las obras
        $scope.foreignbean3 = {};
        $scope.foreignbean3.id = 0;
        $scope.foreignob3 = "obra";
        //------------- 
        function getDataFromServer() {
            // obtener los datos del acto
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
            // obtener los datos de la agrupación
            serverService.promise_getOne($scope.foreignob2, $scope.foreign2).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.foreignbean2 = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor1";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor2";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor3";
            });
            // datos de las obras del repertorio
            serverService.promise_getCountXForeignXForeign2($scope.ob, $scope.foreign, $scope.foreign2, $scope.filterExpression).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPageXForeignXForeign2($scope.ob, $scope.foreign, $scope.foreign2, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
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
        }
//        $scope.pop = function (id, foreignObjectName, foreignContollerName, foreignViewName) {
//            var modalInstance = $uibModal.open({
//                templateUrl: 'js/' + foreignObjectName + '/' + foreignViewName + '.html',
//                controller: foreignContollerName,
//                size: 'lg',
//                resolve: {
//                    id: function () {
//                        return id;
//                    }
//                }
//            }).result.then(function (modalResult) {
//                if (modalResult) {
//                    getDataFromServer();
//                }
//
//            });
//        };
        getDataFromServer();
    }]);


