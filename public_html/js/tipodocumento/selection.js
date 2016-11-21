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



moduloTipodocumento.controller('TipodocumentoSelectionController', ['$scope', '$routeParams', 'serverService', 'sharedSpaceService', '$location', '$uibModalInstance', 'numpage', 'rpp', 'neighbourhood', 'id_tipodocumento',
    function ($scope, $routeParams, serverService, sharedSpaceService, $location, $modalInstance, numpage, rpp, neighbourhood, id_tipodocumento) {


        $scope.Fields = [
            {name: "id", shortname: "ID", longname: "Identificador", visible: true},
            {name: "descripcion", shortname: "Desc.", longname: "Descripción", visible: true}
        ];


        $scope.closeForm = function (id) {

            $modalInstance.close(id);
        };


//        $scope.ok = function () {
//
//            $modalInstance.close(id);
//        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }

        $scope.ob = "tipodocumento";
        $scope.op = "selection";
        $scope.title = "Selección de tipo de documento";
        $scope.icon = "fa-user";



        $scope.rpp = rpp;
        $scope.numpage = numpage;

//        //--
//        if (!$routeParams.page) {
//            $routeParams.page = 1;
//        }
//        if (!$routeParams.rpp) {
//            $routeParams.rpp = 10;
//        }
//if (!$routeParams.rpp) {
//        $scope.neighbourhood = 2;
//    }
        //-----
//        $scope.ufilter = serverService.getParamArray($routeParams.filter);
//        $scope.uorder = serverService.getParamArray($routeParams.order);
        //-----
//        $scope.filter = "id";
//        $scope.filteroperator = "like";
//        $scope.filtervalue = "";

        getData();

        function getData() {
            serverService.get('ob=tipodocumento&page=' + $scope.numpage + '&rpp=' + $scope.rpp + serverService.getParamString4AJAX($scope.ufilter, 'filter') + serverService.getParamString4AJAX($scope.uorder, 'order')).then(function (result) {
                if (result) {
                    if (result.status == 200) {
                        $scope.page = result.data.message.rows;
                        $scope.queryregisters = result.data.message.queryregisters;
                        $scope.totalregisters = result.data.message.totalregisters;
                        $scope.pages = serverService.getNumPages($scope.queryregisters, $scope.rpp);
                        $scope.status = "";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            })
        }

        $scope.$on('filterSelectionEvent', function (event, data) {
            $scope.ufilter = data;
            getData();
        });
        $scope.$on('orderSelectionEvent', function (event, data) {
            $scope.uorder = data;
            getData();
        });
        $scope.$on('pageSelectionEvent', function (event, data) {
            $scope.numpage = data;
            getData();
        });
        $scope.$on('rppSelectionEvent', function (event, data) {
            $scope.rpp = data;
            getData();
        });

    }]);

