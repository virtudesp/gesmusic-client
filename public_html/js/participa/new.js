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

moduloParticipa.controller('ParticipaNewController', ['$scope', '$routeParams', '$location', 'serverService', 'participaService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, participaService, sharedSpaceService, $filter, $uibModal) {
        // parámetro que viene en la url: id_acto
        $scope.foreign = $routeParams.foreign;
        $scope.urlplist = "participa/plist/" + $scope.foreign;
        $scope.foreignob = "acto";
        //-------
        $scope.fields = participaService.getFields();
        $scope.obtitle = participaService.getObTitle();
        $scope.icon = participaService.getIcon();
        $scope.ob = participaService.getTitle();
        $scope.title = "Añadiendo un participante";
        $scope.op = "new";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        //------- Para guardar los datos del acto y mostrarlos en la cabecera
        $scope.foreignbean = {};
        $scope.foreignbean.id = 0;
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
        //------- guardar la agrupación seleccionada
        $scope.bean = {};        
        $scope.bean.obj_agrupacion = {"id": 0};
        if ($routeParams.id_agrupacion) {
            serverService.promise_getOne('agrupacion', $routeParams.id_agrupacion).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_agrupacion = response.data.message;
                    $scope.show_obj_agrupacion = false;
                    $scope.title = "Nuevo participante";
                }
            });
        } else {
            $scope.show_obj_agrupacion = true;
        }
        $scope.save = function () {
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOneXId($scope.ob, $scope.foreign, jsonToSend).then(function (response) {
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
            $location.path($scope.urlplist);
        };
    }]);

