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

moduloEpisodio.controller('EpisodioEditController', ['$scope', '$routeParams', '$location', 'serverService', 'episodioService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, episodioService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = episodioService.getFields();
        $scope.obtitle = episodioService.getObTitle();
        $scope.icon = episodioService.getIcon();
        $scope.ob = episodioService.getTitle();
        $scope.title = "Editando " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.error = true;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.bean.obj_importancia = {"id": 0};
        $scope.bean.obj_servicio = {"id": 0};
        $scope.bean.obj_tipo = {"id": 0};
        $scope.bean.obj_paciente = {"id": 0};
        $scope.bean.obj_medico = {"id": 0};
        $scope.bean.obj_episodio = {"id": 0};
        $scope.bean.obj_cargo = {"id": 0};
        $scope.show_obj_importancia = true;
        $scope.show_obj_servicio = true;
        $scope.show_obj_tipo = true;
        $scope.show_obj_paciente = true;
        $scope.show_obj_medico = true;
        $scope.show_obj_episodio = true;
        $scope.show_obj_cargo = true;
        $scope.id = $routeParams.id;
        serverService.promise_getOne($scope.ob, $scope.id).then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    $scope.status = null;
                    $scope.bean = response.data.message;
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });
        $scope.save = function () {
            $scope.bean.fecha = $filter('date')($scope.bean.fecha, "dd/MM/yyyy HH:mm");

            if ($scope.bean.obj_importancia.id <= 0)
                $scope.bean.obj_importancia.id = null;
            if ($scope.bean.obj_servicio.id <= 0)
                $scope.bean.obj_servicio.id = null;
            if ($scope.bean.obj_tipo.id <= 0)
                $scope.bean.obj_tipo.id = null;
            if ($scope.bean.obj_paciente.id <= 0)
                $scope.bean.obj_paciente.id = null;
            if ($scope.bean.obj_medico.id <= 0)
                $scope.bean.obj_medico.id = null;
            if ($scope.bean.obj_episodio.id <= 0)
                $scope.bean.obj_episodio.id = null;
            if ($scope.bean.obj_cargo.id <= 0)
                $scope.bean.obj_cargo.id = null;

            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha modificado ... id = " + $scope.bean.id;
                        $scope.bean.id = $scope.bean.id;
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
        $scope.chooseOne = function (nameForeign, foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg'
            }).result.then(function (modalResult) {
                $scope.bean[nameForeign].id = modalResult;
            });
        };

        $scope.$watch('bean.obj_importancia.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('importancia', $scope.bean.obj_importancia.id).then(function (response) {
                    var old_id = $scope.bean.obj_importancia.id;
                    $scope.bean.obj_importancia = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.outerForm.obj_importancia.$setValidity('exists', true);
                        $scope.bean.obj_importancia.id = old_id;
                    }
                }).catch(function (data) {
                    $scope.outerForm.obj_importancia.$setValidity('exists', false);
                });
            }
        });

        $scope.$watch('bean.obj_servicio.id', function () {
            if ($scope.bean.obj_servicio.id >= 0) {
                serverService.promise_getOne('servicio', $scope.bean.obj_servicio.id).then(function (response) {
                    var old_id = $scope.bean.obj_servicio.id;
                    $scope.bean.obj_servicio = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_servicio.id = old_id;
                    }
                });
            } else {
                $scope.bean.obj_servicio.descripcion = "";
            }
        });

        $scope.$watch('bean.obj_tipo.id', function () {
            if ($scope.bean.obj_tipo.id >= 0) {
                serverService.promise_getOne('tipo', $scope.bean.obj_tipo.id).then(function (response) {
                    var old_id = $scope.bean.obj_tipo.id;
                    $scope.bean.obj_tipo = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_tipo.id = old_id;
                    }
                });
            } else {
                $scope.bean.obj_tipo.descripcion = "";
            }
        });

        $scope.$watch('bean.obj_paciente.id', function () {
            if ($scope.bean.obj_paciente.id) {
                serverService.promise_getOne('paciente', $scope.bean.obj_paciente.id).then(function (response) {
                    var old_id = $scope.bean.obj_paciente.id;
                    $scope.bean.obj_paciente = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_paciente.id = old_id;
                    }
                });
            } else {
                $scope.bean.obj_paciente.name = "";
                $scope.bean.obj_paciente.pimer_apellido = "";
            }
        });

        $scope.$watch('bean.obj_medico.id', function () {
            if ($scope.bean.obj_medico.id > 0) {
                serverService.promise_getOne('medico', $scope.bean.obj_medico.id).then(function (response) {
                    var old_id = $scope.bean.obj_medico.id;
                    $scope.bean.obj_medico = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_medico.id = old_id;
                    }
                });
                var filter = "and,id_medico,equa," + $scope.bean.obj_medico.id;

                serverService.promise_getPage("usuario", 1, 1, filter).then(function (data) {
                    if (data.data.message.length > 0) {
                        $scope.medico = data.data.message[0];
                        $scope.outerForm.obj_medico.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_medico.$setValidity('exists', false);
                        $scope.medico = {nombre: "", primerapellido: ""};
                    }
                });
            } else if ($scope.bean.obj_medico.id || $scope.bean.obj_medico.id === "") {
                $scope.outerForm.obj_medico.$setValidity('exists', true);
                $scope.medico = {nombre: "", primerapellido: ""};
                $scope.bean.obj_medico.id = 0;
            }
        });

        $scope.$watch('bean.obj_episodio.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('episodio', $scope.bean.obj_episodio.id).then(function (response) {
                    var old_id = $scope.bean.obj_episodio.id;
                    $scope.bean.obj_episodio = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_episodio.id = old_id;
                    }
                });
            }
        });

        $scope.$watch('bean.obj_cargo.id', function () {
            if ($scope.bean) {
                serverService.promise_getOne('cargo', $scope.bean.obj_cargo.id).then(function (response) {
                    var old_id = $scope.bean.obj_cargo.id;
                    $scope.bean.obj_cargo = response.data.message;
                    if (response.data.message.id <= 0) {
                        $scope.bean.obj_cargo.id = old_id;
                    }
                });
            }
        });
    }]);
