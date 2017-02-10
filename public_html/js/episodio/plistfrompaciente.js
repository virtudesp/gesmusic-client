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

moduloEpisodio.controller('EpisodioPListFromPacienteController', ['$scope', '$routeParams', '$location', 'serverService', 'episodioService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, episodioService, $uibModal) {
        $scope.fields = episodioService.getFields();
        $scope.obtitle = episodioService.getObTitle();
        $scope.icon = episodioService.getIcon();
        $scope.ob = episodioService.getTitle();

        $scope.op = "plistfrompaciente";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(10, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        $scope.order = "";
        $scope.ordervalue = "";
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.fechas = [];
        $scope.importes = [];
        $scope.filtervalue = "";
        $scope.filterParams = serverService.checkNull($routeParams.filter)
        $scope.orderParams = serverService.checkNull($routeParams.order)
        $scope.sfilterParams = serverService.checkNull($routeParams.sfilter)
        $scope.filterExpression = serverService.getFilterExpression($routeParams.filter, $routeParams.sfilter);
        $scope.status = null;
        $scope.debugging = serverService.debugging();


        //-------------------------------------------
        $scope.id_paciente = serverService.checkNull($routeParams.id_paciente)
        if ($scope.id_paciente) {
            serverService.promise_getOne('paciente', $scope.id_paciente).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.bean = {};
                        $scope.bean.obj_paciente = {};
                        $scope.bean.obj_paciente = response.data.message;
                        $scope.title = "Episodios para el/la paciente " + $scope.bean.obj_paciente.name + " " + $scope.bean.obj_paciente.primer_apellido + " " + $scope.bean.obj_paciente.segundo_apellido;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
            $scope.url = $scope.ob + '/' + $scope.op + '/' + $scope.id_paciente;
            $scope.urlnew = $scope.ob + '/newfrompaciente/' + +$scope.id_paciente;
            if ($scope.filterExpression) {
                $scope.filterExpression += "+and,id_paciente,equa," + $scope.id_paciente;
            } else {
                $scope.filterExpression = "and,id_paciente,equa," + $scope.id_paciente;
            }
        } else {
            $scope.url = $scope.ob + '/' + $scope.op;
            $scope.urlnew = $scope.ob + '/new';
            $scope.title = "Listado de " + $scope.obtitle;
        }
        //-------------------------------------------


        function getDataFromServer() {
            serverService.promise_getCount($scope.ob, $scope.filterExpression).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.page = response.data.message;
                    for (var i = 0; i < $scope.page.length; i++) {
                        $scope.fechas.push($scope.page[i].fecha);
                        $scope.importes.push($scope.page[i].importe);
                    }
                    console.log($scope.importes + " " + $scope.fechas);
                    $scope.status = "";
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
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


