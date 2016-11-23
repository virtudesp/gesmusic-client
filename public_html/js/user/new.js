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

moduloUser.controller('UserNewController', ['$scope', '$routeParams', '$location', 'serverService', 'sharedSpaceService', '$filter',
    function ($scope, $routeParams, $location, serverService, sharedSpaceService, $filter) {
        $scope.fields = userService.getFields();
        $scope.obtitle = userService.getObTitle();
        $scope.icon = userService.getIcon();
        $scope.ob = userService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "plist";
        $scope.result = null;
        $scope.obj = {};
        $scope.obj.obj_usertype = {"id": 0};
        if ($routeParams.id_usertype) {
            serverService.promise_getOne('usertype', $routeParams.id_usertype).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.obj.obj_usertype = response.data.message;
                    $scope.show_obj_usertype = false;
                    $scope.title = "Nuevo usuario del tipo" + $scope.obj.obj_usertype.description;
                }
            });
        } else {
            $scope.show_obj_usertype = true;
        }
        $scope.save = function () {
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.obj))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (data) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.obj = response.data.message;
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
        $scope.chooseOne = function (foreignObjectName, contollerName) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/' + foreignObjectName + '/selection.html',
                controller: contollerName,
                size: 'lg'
            }).result.then(function (modalResult) {
                $scope.obj.obj_usuario.id = modalResult;
            });
        };
        $scope.$watch('obj.obj_usertype.id', function () {
            if ($scope.obj) {
                serverService.promise_getOne('usertype', $scope.obj.obj_usertype.id).then(function (response) {
                    var old_id = $scope.obj.obj_usertype.id;
                    $scope.obj.obj_usertype = response.data.message;
                    if (response.data.message.id != 0) {
                        $scope.outerForm.obj_usertype.$setValidity('exists', true);
                    } else {
                        $scope.outerForm.obj_usertype.$setValidity('exists', false);
                        $scope.obj.obj_usertype.id = old_id;
                    }
                });
            }
        });
    }]);

