/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * dolity: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & zylkanexy
 * dolity is distributed under the MIT License (MIT)
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

moduloUsertype.controller('UsertypePListController', ['$scope', '$routeParams', 'serverService', '$location', '$uibModal',
    function ($scope, $routeParams, serverService, $location, $uibModal) {

       $scope.Fields = [
            {name: "id", shortname: "ID", longname: "Identificador", visible: true},
            {name: "description", shortname: "Descripción", longname: "Descripción", visible: true},
            {name: "discount", shortname: "Descuento", longname: "Descuento", visible: false}
        ];

        $scope.ob = "usertype";
        $scope.op = "plist";
        $scope.title = "Listado de tipo de documento";
        $scope.icon = "fa-file-text-o";

        $scope.numpage = $routeParams.page;
        $scope.rpp = $routeParams.rpp;
        $scope.neighbourhood = 2;

        if (!$routeParams.page || $routeParams.page < 1) {
            $scope.numpage = 1;
        } else {
            $scope.numpage = $routeParams.page;
        }

        if (!$routeParams.rpp || $routeParams.rpp < 1) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        $scope.order = "";
        $scope.ordervalue = "";

        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";

        if ($routeParams.filter) {
            $scope.filterParams = $routeParams.filter;
        } else {
            $scope.filterParams = null;
        }

        if ($routeParams.order) {
            $scope.orderParams = $routeParams.order;
        } else {
            $scope.orderParams = null;
        }

        if ($routeParams.sfilter) {
            $scope.sfilterParams = $routeParams.sfilter;
        } else {
            $scope.sfilterParams = null;
        }

        if ($routeParams.sfilter) {
            $scope.filterExpression = $routeParams.filter + '+' + $routeParams.sfilter;
        } else {
            $scope.filterExpression = $routeParams.filter;
        }

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
                $scope.status = "";
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });


        $scope.viewOne = function (id, foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/viewpop.html',
                controller: contollerName,
                size: 'lg',
                resolve: {                    
                    id: function () {
                        return id;
                    }
                }
            }).result.then(function (modalResult) {

            });
        };


    }]);
