/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * escalamio: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & zylkanexy
 * escalamio is distributed under the MIT License (MIT)
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
moduloDocumento.controller('DocumentoEditController', ['$scope', '$uibModal', '$routeParams', '$location', 'serverService', 'sharedSpaceService', '$filter',
    function ($scope, $uibModal, $routeParams, $location, serverService, sharedSpaceService, $filter) {
        $scope.obj = {};
        $scope.objRaw = null;
        $scope.id = $routeParams.id;
        $scope.ob = 'documento';
        $scope.op = 'edit';
        $scope.result = null;
        $scope.title = "Edición de documento";
        $scope.icon = "fa-file-text-o";
        if (sharedSpaceService.getFase() == 0) {
            //if we aren't returning from a foreign key election request data from server
            serverService.get('ob=maxi_documento&page=1&rpp=100&filter[]=id,equa,' + $scope.id).then(function (result) {
                if (result) {
                    if (result.status == 200) {
                        //pick data from server
                        $scope.queryregisters = result.data.message.queryregisters;
                        $scope.totalregisters = result.data.message.totalregisters;
                        $scope.objRaw = result.data.message.rows[0];
                        //data conversión from server json-------------------------------                                                
                        $scope.obj.alta = serverService.date_toDate2($scope.objRaw.alta);
                        $scope.obj.cambio = serverService.date_toDate2($scope.objRaw.cambio);
                        if ($scope.objRaw.portada)
                            $scope.obj.portada = true;
                        else
                            $scope.obj.portada = false;
                        if ($scope.objRaw.destacado)
                            $scope.obj.destacado = true;
                        else
                            $scope.obj.destacado = false;
                        if ($scope.objRaw.publicado)
                            $scope.obj.publicado = true;
                        else
                            $scope.obj.publicado = false;
                        $scope.obj.titulo = $scope.objRaw.titulo;
                        $scope.obj.contenido = $scope.objRaw.titulo;
                        $scope.obj.hits = $scope.objRaw.hits;
                        $scope.obj.id_usuario = $scope.objRaw.id_usuario;
                        $scope.obj.id_tipodocumento = $scope.objRaw.id_tipodocumento;
                        $scope.obj.id = $scope.objRaw.id;
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            })
        } else {
            $scope.obj = sharedSpaceService.getObject();
            sharedSpaceService.setFase(0);
        }





//        $scope.id_usuario = {
//            id: 0
//        };
        $scope.chooseOneUsuario = function (foreignObjectName, contollerName) {
            var modalInstance = $modal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg',
                resolve: {
                    numpage: function () {
                        return 1;
                    },
                    rpp: function () {
                        return 10;
                    },
                    neighbourhood: function () {
                        return 2;
                    },
                    id_usuario: function () { //?????
                        return $scope.id_usuario;
                    }
                }
            }).result.then(function (modalResult) {
                $scope.obj.id_usuario = modalResult;
                serverService.get('ob=' + foreignObjectName + '&page=1&rpp=1&filter[]=id,equa,' + modalResult).then(function (result) {
                    if (result) {
                        if (result.status == 200) {
                            //pick data from server
                            $scope.objRaw.nombre = result.data.message.rows[0].nombre;
                            $scope.objRaw.apellidos = result.data.message.rows[0].apellidos;
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                })
            });
        };

//        $scope.id_tipodocumento = {
//            id: 0
//        };
        $scope.chooseOneTipodocumento = function (foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg',
                resolve: {
                    numpage: function () {
                        return 1;
                    },
                    rpp: function () {
                        return 10;
                    },
                    neighbourhood: function () {
                        return 2;
                    },
                    id_tipodocumento: function () {
                        return $scope.id_tipodocumento;
                    }
                }
            }).result.then(function (modalResult) {
                $scope.obj.id_tipodocumento = modalResult;
                serverService.get('ob=' + foreignObjectName + '&page=1&rpp=1&filter[]=id,equa,' + modalResult).then(function (result) {
                    if (result) {
                        if (result.status == 200) {
                            //pick data from server
                            $scope.objRaw.descripcion = result.data.message.rows[0].descripcion;

                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                })
            });
        };


//        $scope.chooseOne = function (foreignObjectName) {
//            sharedSpaceService.setObject($scope.obj);
//            sharedSpaceService.setReturnLink('/' + $scope.ob + '/' + $scope.op + '/' + $scope.id);
//            sharedSpaceService.setFase(1);
//            $location.path('/' + foreignObjectName + '/selection/1/10');
//        }






        $scope.save = function () {
            var dateAltaAsString = $filter('date')($scope.obj.alta, "dd/MM/yyyy");
            var dateCambioAsString = $filter('date')($scope.obj.cambio, "dd/MM/yyyy");
            $scope.obj.alta = dateAltaAsString;
            $scope.obj.cambio = dateCambioAsString;
            //console.log({json: JSON.stringify(serverService.array_identificarArray($scope.obj))});

            console.log($scope.obj);

            serverService.put('ob=documento&id=' + $scope.obj.id, JSON.stringify($scope.obj)).then(function (result) {
                if (result) {
                    if (result.status == 200) {
                        $scope.result = result;
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            })


//            serverService.getDataFromPromise(serverService.promise_setOne($scope.ob, {json: JSON.stringify(serverService.array_identificarArray($scope.obj))})).then(function (data) {
//                $scope.result = data;
//            });
        };
//        $scope.$watch('obj.obj_tipodocumento.id', function () {
//            if ($scope.obj) {
//                serverService.getDataFromPromise(serverService.promise_getOne('tipodocumento', $scope.obj.obj_tipodocumento.id)).then(function (data2) {
//                    $scope.obj.obj_tipodocumento = data2.message;
//                });
//            }
//        });
//        $scope.$watch('obj.id_usuario', function () {
//            if ($scope.obj) {
//                serverService.getDataFromPromise(serverService.promise_getOne('usuario', $scope.obj.id_usuario)).then(function (data2) {
//                    //pte!!
//
//                    $scope.obj.obj_usuario = data2.message;
//                });
//            }
//        });
        $scope.back = function () {
            window.history.back();
        };
        $scope.close = function () {
            $location.path('/home');
        };
        $scope.plist = function () {
            $location.path('/documento/plist');
        };


        //datepickers
        $scope.minDate = new Date(2016, 0, 1);
        $scope.maxDate = new Date(2019, 11, 31);

        //datepicker 1 (fecha de alta)
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.dateOptions1 = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        //datepicker 2 (fecha de alta)
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.dateOptions2 = {
            formatYear: 'yyyy',
            startingDay: 1
        };


//        $scope.disabled = function (date, mode) {
//            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//        };
    }]);