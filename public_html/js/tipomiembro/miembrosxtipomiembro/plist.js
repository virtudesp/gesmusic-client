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

moduloMiembro.controller('MiembrosXTipomiembroPListController', ['$scope', '$routeParams', '$location', 'serverService', 'miembroService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, miembroService, $uibModal) {
        //datos del tipomiembro
//        $scope.id = $routeParams.id;
        $scope.foreign = $routeParams.id;
        $scope.nombre = "";//$routeParams.nombre;
        $scope.apellidos = ""; //$routeParams.apellidos; 
        $scope.title = "Miembros del tipomiembro: ";// + $scope.nombre + " " + $scope.apellidos;

        $scope.fields = miembroService.getFields(false);
        $scope.obtitle = miembroService.getObTitle();
        $scope.icon = miembroService.getIcon();
        $scope.ob = miembroService.getTitle();
        $scope.op = "plist";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(10, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        $scope.order = "";
        $scope.ordervalue = "";
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";
        $scope.filterParams = serverService.checkNull($routeParams.filter);
        $scope.orderParams = serverService.checkNull($routeParams.order);
        $scope.sfilterParams = serverService.checkNull($routeParams.sfilter);
        $scope.filterExpression = serverService.getFilterExpression($routeParams.filter, $routeParams.sfilter);
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.urlnew = "tipomiembro/miembrosxtipomiembro/new";
        $scope.urledit = "tipomiembro/miembrosxtipomiembro/edit";
        $scope.urlplist = "tipomiembro/plist";
        $scope.bean = {};

        function getDataFromServer() {
            serverService.promise_getOne($scope.ob, $scope.foreign).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.bean = response.data.message;
                        $scope.title += $scope.bean;//.nombre + " " + $scope.bean.apellidos;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor11";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor22";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor33";
            });
            serverService.promise_getCountXId($scope.ob, $scope.foreign, $scope.filterExpression).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPageXId($scope.ob, $scope.foreign, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
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
        // Para el viewpop
        $scope.pop = function (id, foreignObjectName, foreignContollerName, foreignViewName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/tipomiembro/' + foreignObjectName + '/' + foreignViewName + '.html',
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
        $scope.plist = function () {
            $location.path($scope.urlplist);
        };
    }]);


