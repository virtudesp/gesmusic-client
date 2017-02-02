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

moduloTratamiento.controller('TratamientoNewController', ['$scope', '$routeParams', '$location', 'serverService', 'tratamientoService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, tratamientoService, $filter, $uibModal) {
        $scope.fields = tratamientoService.getFields();
        $scope.obtitle = tratamientoService.getObTitle();
        $scope.icon = tratamientoService.getIcon();
        $scope.ob = tratamientoService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.bean.id = 0;
        //---
        $scope.bean.obj_medicamento = {"id": 0};
        $scope.bean.obj_via = {"id": 0};
        $scope.bean.obj_posologia = {"id": 0};
        $scope.bean.obj_diagnostico = {"id": 0};
        $scope.show_obj_medicamento = true;
        $scope.show_obj_posologia = true;
        $scope.show_obj_via = true;
        $scope.show_obj_diagnostico = true;
        //----

        $scope.save = function () {

            var arrinputdate1 = $scope.bean.fecha_inicio.split(" ");
            var arrFecha1 = arrinputdate1[0].split("/");
            var newDate1 = new Date(arrFecha1[2], arrFecha1[1] - 1, arrFecha1[0]);
            $scope.bean.fecha_inicio = $filter('date')(newDate1, "dd/MM/yyyy HH:mm");

            var arrinputdate2 = $scope.bean.fecha_fin.split(" ");
            var arrFecha2 = arrinputdate2[0].split("/");
            var newDate2 = new Date(arrFecha2[2], arrFecha2[1] - 1, arrFecha2[0]);
            $scope.bean.fecha_fin = $filter('date')(newDate2, "dd/MM/yyyy HH:mm");

            if (newDate1.getTime() > newDate2.getTime())
            {
                //alert("La fecha de inicio no puede ser posterior a la fecha de fin");
                $scope.outerForm.fecha_fin.$setValidity('ordenfechas', false);
                $scope.outerForm.fecha_fin.$setValidity('valid', false);
            }

            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha creado con id = " + response.data.message;
                        $scope.bean.id = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
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
            $location.path('/' + $scope.ob + '/plist');
        };
    }]);

