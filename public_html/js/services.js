/*
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * sisane: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/sisane
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
 */

'use strict';
moduloServicios
        .factory('serverService', function ($http) {
//            function getFilter(filter, filteroperator, filtervalue) {
//                var filterParams;
//                if (filter) {
//                    filterParams = "&filter=" + filter + "&filteroperator=" + filteroperator + "&filtervalue=" + filtervalue;
//                } else {
//                    filterParams = "";
//                }
//                return filterParams;
//            }
//            ;
//            function getOrder(order, ordervalue) {
//                var orderParams;
//                if (order) {
//                    orderParams = '&order=' + order + '&ordervalue=' + ordervalue;
//                } else {
//                    orderParams = "";
//                }
//                return orderParams;
//            }
//            ;
            return {
                getAppUrl: function () {
                    return "http://localhost:8081/sisane-server/json";
                    //return location.protocol + '//' + location.hostname + ':' + location.port + '/' + this.getAppName() + '/index.php';
                },
                //---- OK ----
                getRegExpl: function (reg) {
                    switch (reg) {
                        case "nombre":
                            return "Las palabras deben comenzar con mayúsculas";
                            break;
                        case "palabra":
                            return "No se pueden introducir números, solo palabras en minúscula";
                            break;
                        case "codigopostal":
                            return "Se requieren 4 o 5 dígitos";
                            break;
                        case "email":
                            return  "Introduzca un email válido";
                            break;
                        case "telefono":
                            return  "Introduzca un número de 9 dígitos";
                            break;
                        case "login":
                            return  "Introduza una palabra de 5 a 16 caracteres alfanuméricos";
                            break;
                        case "password":
                            return  "Introduzca palabra de al menos 8 caracteres con numeros y letras mayúsculas y minúsculas";
                            break;
                        case "integer":
                            return "Introduzca un número entero";
                            break;
                        case "decimal":
                            return "Introduzca un número decimal (decimal=punto) con dos decimales";
                            break;
                        case "alpha-numeric":
                            return "Introduzca una cadena de números y letras";
                            break;
                        case "url":
                            return "Introduza una URL válida";
                            break;
                        default:
                            return null;
                    }
                },
                getRegExpr: function (reg) {
                    switch (reg) {
                        case "nombre":
                            return /^([A-Z]{1}[a-zñáéíóúàèò]+[\s]*)+$/;
                            break;
                        case "palabra":
                            return /^([a-z]{1}[a-zñáéíóúàèò]+[\s]*)+$/;
                            break;
                        case "codigopostal":
                            return /^\d{4,5}$/;
                            break;
                        case "email":
                            return  /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
                            //return new RegExp("([\w-\.]+@[\w\.]+\.{1}[\w]+)", "g");
                            break;
                        case "telefono":
                            return  /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;
                            break;
                        case "login":
                            return  /^[a-z0-9_-]{5,16}$/;
                            break;
                        case "password":
                            return  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                            break;
                        case "integer":
                            return new RegExp("-?[0-9]+", "g");
                            break;
                        case "decimal":
                            return /^\d+(?:\.\d{1,2})?$/;
                            break;
                        case "alpha-numeric":
                            return new RegExp("^[a-zA-Z0-9]+$", "g");
                            break;
                        case "url":
                            return new RegExp("(http://|ftp://)([\w-\.)(\.)([a-zA-Z]+)", "g");
                            break;
                        default:
                            return null;
                    }
                },
                debugging: function () {
                    return true;
                },
                checkDefault: function (defaultValue, checkedVariable) {
                    if (!checkedVariable || checkedVariable < 1) {
                        return defaultValue;
                    } else {
                        return checkedVariable;
                    }
                },
                checkNull: function (checkedVariable) {
                    if (checkedVariable) {
                        return checkedVariable;
                    } else {
                        return null;
                    }
                },
                checkEmptyString: function (checkedVariable) {
                    if (checkedVariable) {
                        return checkedVariable;
                    } else {
                        return "";
                    }
                },
                getGlobalNeighbourhood: function () {
                    return 2;
                },
                //---------------------------------------
                getLoginPromise: function (username, password) {
                    password = forge_sha256(password).toUpperCase();
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=login&user=' + username + '&pass=' + password, 'GET', '');
                },
                getPasswordChangePromise: function (oldpass, newpass) {
                    var oldpassword = forge_sha256(oldpass).toUpperCase();
                    var newpassword = forge_sha256(newpass).toUpperCase();
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=passchange&old=' + oldpassword + '&new=' + newpassword, 'GET', '');
                },
                getLogoutPromise: function () {
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=logout', 'GET', '');
                },
                getSessionPromise: function () {
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=getsessionstatus', 'GET', '');
                },
                //------------------------------------------------
                promise_getCount: function (strObject, filter) {
                    if (filter) {
                        filter = "&filter=" + filter;
                    } else {
                        filter = "";
                    }
                    return $http.get(this.getAppUrl() + '?ob=' + strObject + '&op=getcount' + filter, 'GET', '');
                },
                promise_getPage: function (strObject, rpp, page, filter, order) {
                    if (filter) {
                        filter = "&filter=" + filter;
                    } else {
                        filter = "";
                    }
                    if (order) {
                        order = "&order=" + order;
                    } else {
                        order = "";
                    }
                    return $http.get(this.getAppUrl() + '?ob=' + strObject + '&op=getpage&page=' + page + "&rpp=" + rpp + filter + order, 'GET', '');
                },
                promise_getOne: function (strClass, id) {
                    return $http.get(this.getAppUrl() + '?ob=' + strClass + '&op=get&id=' + id, 'GET', '');
                },
                promise_removeOne: function (strClass, id) {
                    return $http.get(this.getAppUrl() + '?ob=' + strClass + '&op=remove&id=' + id, 'GET', '');
                },
                promise_setOne: function (strClass, jsonfile) {
                    $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
                    return $http.get(this.getAppUrl() + '?ob=' + strClass + '&op=set', {params: jsonfile});
                },
                //--------
                date_toDate: function (input) {
                    var parts = input.split('/');
                    return new Date(parts[2], parts[1] - 1, parts[0]);
                },
                date_toDate2: function (input) {
                    var parts = input.split('-');
                    return new Date(parts[0], parts[1] - 1, parts[2]);
                },
                array_identificarArray: function (arr) {
                    var newObj = {};
                    for (var property in arr) {
                        if (arr.hasOwnProperty(property)) {
                            if (property.match("^obj_")) {
                                newObj[property.replace("obj_", "id_")] = arr[property].id;
                            } else {
                                newObj[property] = arr[property];
                            }
                        }
                    }
                    return newObj;
                },
                //----------------------------
                calculatePages: function (regsPerPage, totalRegisters) {
                    var pages = Math.floor(totalRegisters / regsPerPage);
                    var remainderPages = totalRegisters % regsPerPage;
                    if (remainderPages > 0) {
                        pages++;
                    }
                    return pages;
                },
                //-----
                getRangeArray: function (lowEnd, highEnd) {
                    var rangeArray = [];
                    for (var i = lowEnd; i <= highEnd; i++) {
                        rangeArray.push(i);
                    }
                    return rangeArray;
                },
                evaluateMin: function (lowEnd, highEnd) {
                    return Math.min(lowEnd, highEnd);
                },
                evaluateMax: function (lowEnd, highEnd) {
                    return Math.max(lowEnd, highEnd);
                },
                capitalizeWord: function (string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            };
        })
        .factory('sharedSpaceService', function ($http) {
            var obj = {};
            var link = "";
            var fase = 0;
            return {
                getObject: function () {
                    return obj;
                },
                setObject: function (value) {
                    obj = value;
                },
                getReturnLink: function () {
                    return link;
                },
                setReturnLink: function (value) {
                    link = value;
                },
                getFase: function () {
                    return fase;
                },
                setFase: function (value) {
                    fase = value;
                }

            };
        })
        .factory('sessionService', function ($http) {
            var isSessionActive = false;
            var username = "";
            var id = 0;
            return {
                getUsername: function () {
                    return username;
                },
                setUsername: function (value) {
                    username = value;
                },
                getId: function () {
                    return id;
                },
                setId: function (value) {
                    id = value;
                },
                isSessionActive: function () {
                    return isSessionActive;
                },
                setSessionInactive: function () {
                    isSessionActive = false;
                },
                setSessionActive: function () {
                    isSessionActive = true;
                }
            };
        })
        .factory('metaService', [
            'serverService',
            'analiticaService',
            'anticoagulanteService',
            'cargoService',
            'diagnosticoService',
            'documentoService',
            'episodioService',
            'especialidadService',
            'imagenService',
            'importanciaService',
            'medicamentoService',
            'medicoService',
            'pacienteService',
            'posologiaService',
            'prioridadService',
            'pruebaService',
            'servicioService',
            'tecnicaService',
            'tipoService',
            'tipodiagnosticoService',
            'tipodocumentoService',
            'tipomuestraService',
            'tipousuarioService',
            'tratamientoService',
            'usuarioService',
            'viaService',
            'zonaService',
            'zonaimagenService',
            function (
                    serverService,
                    analiticaService,
                    anticoagulanteService,
                    cargoService,
                    diagnosticoService,
                    documentoService,
                    episodioService,
                    especialidadService,
                    imagenService,
                    importanciaService,
                    medicamentoService,
                    medicoService,
                    pacienteService,
                    posologiaService,
                    prioridadService,
                    pruebaService,
                    servicioService,
                    tecnicaService,
                    tipoService,
                    tipodiagnosticoService,
                    tipodocumentoService,
                    tipomuestraService,
                    tipousuarioService,
                    tratamientoService,
                    usuarioService,
                    viaService,
                    zonaService,
                    zonaimagenService
                    ) {
                var meta = {};
                return {
                    getMeta: function () {
                        meta.analitica = ({'fields': analiticaService.getFields(), 'name': analiticaService.getTitle(), 'title': serverService.capitalizeWord(analiticaService.getObTitle()), 'icon': analiticaService.getIcon()});
                        meta.anticoagulante = ({'fields': anticoagulanteService.getFields(), 'name': anticoagulanteService.getTitle(), 'title': serverService.capitalizeWord(anticoagulanteService.getObTitle()), 'icon': anticoagulanteService.getIcon()});
                        meta.cargo = ({'fields': cargoService.getFields(), 'name': cargoService.getTitle(), 'title': serverService.capitalizeWord(cargoService.getObTitle()), 'icon': cargoService.getIcon()});
                        meta.diagnostico = ({'fields': diagnosticoService.getFields(), 'name': diagnosticoService.getTitle(), 'title': serverService.capitalizeWord(diagnosticoService.getObTitle()), 'icon': diagnosticoService.getIcon()});
                        meta.documento = ({'fields': documentoService.getFields(), 'name': documentoService.getTitle(), 'title': serverService.capitalizeWord(documentoService.getObTitle()), 'icon': documentoService.getIcon()});
                        meta.episodio = ({'fields': episodioService.getFields(), 'name': episodioService.getTitle(), 'title': serverService.capitalizeWord(episodioService.getObTitle()), 'icon': episodioService.getIcon()});
                        meta.especialidad = ({'fields': especialidadService.getFields(), 'name': especialidadService.getTitle(), 'title': serverService.capitalizeWord(especialidadService.getObTitle()), 'icon': especialidadService.getIcon()});
                        meta.imagen = ({'fields': imagenService.getFields(), 'name': imagenService.getTitle(), 'title': serverService.capitalizeWord(imagenService.getObTitle()), 'icon': imagenService.getIcon()});
                        meta.importancia = ({'fields': importanciaService.getFields(), 'name': importanciaService.getTitle(), 'title': serverService.capitalizeWord(importanciaService.getObTitle()), 'icon': importanciaService.getIcon()});
                        meta.medicamento = ({'fields': medicamentoService.getFields(), 'name': medicamentoService.getTitle(), 'title': serverService.capitalizeWord(medicamentoService.getObTitle()), 'icon': medicamentoService.getIcon()});
                        meta.medico = ({'fields': medicoService.getFields(), 'name': medicoService.getTitle(), 'title': serverService.capitalizeWord(medicoService.getObTitle()), 'icon': medicoService.getIcon()});
                        meta.paciente = ({'fields': pacienteService.getFields(), 'name': pacienteService.getTitle(), 'title': serverService.capitalizeWord(pacienteService.getObTitle()), 'icon': pacienteService.getIcon()});
                        meta.posologia = ({'fields': posologiaService.getFields(), 'name': posologiaService.getTitle(), 'title': serverService.capitalizeWord(posologiaService.getObTitle()), 'icon': posologiaService.getIcon()});
                        meta.prioridad = ({'fields': prioridadService.getFields(), 'name': prioridadService.getTitle(), 'title': serverService.capitalizeWord(prioridadService.getObTitle()), 'icon': prioridadService.getIcon()});
                        meta.prueba = ({'fields': pruebaService.getFields(), 'name': pruebaService.getTitle(), 'title': serverService.capitalizeWord(pruebaService.getObTitle()), 'icon': pruebaService.getIcon()});
                        meta.servicio = ({'fields': servicioService.getFields(), 'name': servicioService.getTitle(), 'title': serverService.capitalizeWord(servicioService.getObTitle()), 'icon': servicioService.getIcon()});
                        meta.tecnica = ({'fields': tecnicaService.getFields(), 'name': tecnicaService.getTitle(), 'title': serverService.capitalizeWord(tecnicaService.getObTitle()), 'icon': tecnicaService.getIcon()});
                        meta.tipo = ({'fields': tipoService.getFields(), 'name': tipoService.getTitle(), 'title': serverService.capitalizeWord(tipoService.getObTitle()), 'icon': tipoService.getIcon()});
                        meta.tipodiagnostico = ({'fields': tipodiagnosticoService.getFields(), 'name': tipodiagnosticoService.getTitle(), 'title': serverService.capitalizeWord(tipodiagnosticoService.getObTitle()), 'icon': tipodiagnosticoService.getIcon()});
                        meta.tipodocumento = ({'fields': tipodocumentoService.getFields(), 'name': tipodocumentoService.getTitle(), 'title': serverService.capitalizeWord(tipodocumentoService.getObTitle()), 'icon': tipodocumentoService.getIcon()});
                        meta.tipomuestra = ({'fields': tipomuestraService.getFields(), 'name': tipomuestraService.getTitle(), 'title': serverService.capitalizeWord(tipomuestraService.getObTitle()), 'icon': tipomuestraService.getIcon()});
                        meta.tipousuario = ({'fields': tipousuarioService.getFields(), 'name': tipousuarioService.getTitle(), 'title': serverService.capitalizeWord(tipousuarioService.getObTitle()), 'icon': tipousuarioService.getIcon()});
                        meta.tratamiento = ({'fields': tratamientoService.getFields(), 'name': tratamientoService.getTitle(), 'title': serverService.capitalizeWord(tratamientoService.getObTitle()), 'icon': tratamientoService.getIcon()});
                        meta.usuario = ({'fields': usuarioService.getFields(), 'name': usuarioService.getTitle(), 'title': serverService.capitalizeWord(usuarioService.getObTitle()), 'icon': usuarioService.getIcon()});
                        meta.via = ({'fields': viaService.getFields(), 'name': viaService.getTitle(), 'title': serverService.capitalizeWord(viaService.getObTitle()), 'icon': viaService.getIcon()});
                        meta.zona = ({'fields': zonaService.getFields(), 'name': zonaService.getTitle(), 'title': serverService.capitalizeWord(zonaService.getObTitle()), 'icon': zonaService.getIcon()});
                        meta.zonaimagen = ({'fields': zonaimagenService.getFields(), 'name': zonaimagenService.getTitle(), 'title': serverService.capitalizeWord(zonaimagenService.getObTitle()), 'icon': zonaimagenService.getIcon()});
                        return meta;
                    }
                }
            }])
        .value('version', '1');
