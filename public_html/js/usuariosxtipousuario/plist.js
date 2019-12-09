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

moduloUsuario.controller('UsuariosXTipousuarioPListController', ['$scope', '$routeParams', '$location', 'serverService', 'usuarioService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, usuarioService, $uibModal) {
        //datos del tipousuario
//        $scope.id = $routeParams.id;
        $scope.foreign = $routeParams.id;
//        $scope.tipousuario = $routeParams.tipousuario; 
        $scope.title = "Usuarios del tipo: ";// + $scope.tipousuario;
        
        $scope.fields = usuarioService.getFields(false);
        $scope.obtitle = usuarioService.getObTitle();
        $scope.icon = usuarioService.getIcon();
        $scope.ob = usuarioService.getTitle();   
        $scope.op = "plist";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(25, $routeParams.rpp);
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
        $scope.url = "tipousuario/" + $scope.ob + '/' + $scope.op;
        $scope.urlnew ="usuariosxtipousuario/new";
        $scope.urledit ="usuariosxtipousuario/edit";
        $scope.urlplist ="tipousuario/plist/1/10";
        
        function getDataFromServer() {
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
                templateUrl: 'js/tipousuario/' + foreignObjectName + '/' + foreignViewName + '.html',
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


