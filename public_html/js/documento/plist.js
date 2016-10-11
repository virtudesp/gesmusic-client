/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * openAUSIAS: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Java and jQuery
 * openAUSIAS is distributed under the MIT License (MIT)
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

moduloDocumento.controller('DocumentoPListController', ['$scope', '$routeParams', 'serverService', '$location',
    function ($scope, $routeParams, serverService, $location) {

        $scope.Fields = [
            {name: "id", shortname: "ID", longname: "Identificador", visible: true},
            {name: "titulo", shortname: "Título", longname: "Título", visible: true},
            {name: "contenido", shortname: "Contenido", longname: "Contenido", visible: false},
            {name: "alta", shortname: "Alta", longname: "Fecha de alta", visible: false},
            {name: "cambio", shortname: "Cambio", longname: "Fecha de último cambio", visible: false},
            {name: "hits", shortname: "Hits", longname: "Visitas", visible: true},
            {name: "id_usuario", shortname: "Usuario", longname: "Usuario propietario", visible: true},
            {name: "id_tipodocumento", shortname: "Tipo", longname: "Tipo de documento", visible: true},
            {name: "etiquetas", shortname: "Etiquetas", longname: "Etiquetas", visible: false},
            {name: "publicado", shortname: "¿Publ.?", longname: "¿Publicado?", visible: true},
            {name: "portada", shortname: "¿Port.?", longname: "¿Portada?", visible: true},
            {name: "destacado", shortname: "¿Dest.?", longname: "¿Destacado?", visible: true}
        ];

        $scope.ob = "documento";
        $scope.op = "plist";
        //--
        $scope.title = "Listado de documentos";
        $scope.icon = "fa-file-text-o";
        //--
        if (!$routeParams.page) {
            $routeParams.page = 1;
        }
        if (!$routeParams.rpp) {
            $routeParams.rpp = 10;
        }
        $scope.numpage = $routeParams.page;
        $scope.rpp = $routeParams.rpp;
        $scope.neighbourhood = 2;
        //-----
        $scope.ufilter = serverService.getParamArray($routeParams.filter);
        $scope.uorder = serverService.getParamArray($routeParams.order);
        //-----
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";
        serverService.get('ob=maxi_documento&page=' + $scope.numpage + '&rpp=' + $scope.rpp + serverService.getParamString4AJAX($scope.ufilter, 'filter') + serverService.getParamString4AJAX($scope.uorder, 'order')).then(function (result) {
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

    }]);
