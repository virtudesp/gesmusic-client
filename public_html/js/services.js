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
//                    return "http://localhost:80/gesmusic-server/json";
                    return "http://localhost:8081/gesmusic-server/json";
                    //return location.protocol + '//' + location.hostname + ':' + location.port + '/' + this.getAppName() + '/index.php';
                },
                getCAppUrl: function () {
                    return "http://localhost:8080/gesmusic-client/public_html/";
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
                        case "usuario":
                            return "Sólamente letras con o sin números";
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
                            return  "Introduzca  una palabra de al menos 5 caracteres con numeros y letras mayúsculas y minúsculas";
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
                        case "inicial":
                            return "Introduza una letra mayúscula";
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
//                            return  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;
                            return  /^.{5,16}$/;
                            break;
                        case "integer":
                            return new RegExp("-?[0-9]+", "g");
                            break;
                        case "decimal":
                            return /^\d+(?:\.\d{1,2})?$/;
                            break;
                        case "usuario":
                            return /^[a-zA-Z]+[0-9]*$/;
                            break;
                        case "alpha-numeric":
                            return new RegExp("^[a-zA-Z0-9]+$", "g");
                            break;
                        case "url":
                            return new RegExp("(http://|ftp://)([\w-\.)(\.)([a-zA-Z]+)", "g");
                            break;
                        case "inicial":
                            return new RegExp("^[A-Z]$", "g");
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
//                    password = forge_sha256(password).toUpperCase();
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=login&user=' + username + '&pass=' + password, 'GET', '');
                    //?ob=usuario&op=login&user=cacun&pass=cacun
                },
                getPasswordChangePromise: function (oldpass, newpass) {
//                    var oldpassword = forge_sha256(oldpass).toUpperCase();
//                    var newpassword = forge_sha256(newpass).toUpperCase();
//                    return $http.get(this.getAppUrl() + '?ob=usuario&op=passchange&old=' + oldpassword + '&new=' + newpassword, 'GET', '');
                    return $http.get(this.getAppUrl() + '?ob=usuario&op=passchange&old=' + oldpass + '&new=' + newpass, 'GET', '');
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
                promise_getAll: function (strClass, filter, order) {
                    filter = (filter === undefined || filter === null) ? "" : filter;
                    order = (order === undefined || order === null) ? "" : order;
                    return $http.get(this.getAppUrl() + '?ob=' + strClass + '&op=getall' + filter + order, 'GET', '');
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
                },
                getFilterExpression: function (filter, sfilter) {
                    if (this.checkEmptyString(filter)) {
                        return this.checkEmptyString(filter)
                    }
                    if (this.checkEmptyString(sfilter)) {
                        if (this.checkEmptyString(filter)) {
                            return this.checkEmptyString(filter) + '+' + this.checkEmptyString(sfilter);
                        } else {
                            return  this.checkEmptyString(sfilter);
                        }
                    }
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
            'miembroService',
            'tipomiembroService',
            'rolService',
            'sociedadService',
            'compositorService',
            'obraService',
            'archivoService',
            'usuarioService',
            'tipousuarioService',
            function (
                    serverService,
                    miembroService,
                    tipomiembroService,
                    rolService,
                    sociedadService,
                    compositorService,
                    obraService,
                    archivoService,
                    usuarioService,
                    tipousuarioService
                    ) {
                var meta = {};
                return {
                    getMeta: function () {
                        meta.miembro = ({'fields': miembroService.getFields(), 'name': miembroService.getTitle(), 'title': serverService.capitalizeWord(miembroService.getObTitle()), 'icon': miembroService.getIcon()});
                        meta.tipomiembro = ({'fields': tipomiembroService.getFields(), 'name': tipomiembroService.getTitle(), 'title': serverService.capitalizeWord(tipomiembroService.getObTitle()), 'icon': tipomiembroService.getIcon()});
                        meta.rol = ({'fields': rolService.getFields(), 'name': rolService.getTitle(), 'title': serverService.capitalizeWord(rolService.getObTitle()), 'icon': rolService.getIcon()});
                        meta.sociedad = ({'fields': sociedadService.getFields(), 'name': sociedadService.getTitle(), 'title': serverService.capitalizeWord(sociedadService.getObTitle()), 'icon': sociedadService.getIcon()});
                        meta.compositor = ({'fields': compositorService.getFields(), 'name': compositorService.getTitle(), 'title': serverService.capitalizeWord(compositorService.getObTitle()), 'icon': compositorService.getIcon()});
                        meta.obra = ({'fields': obraService.getFields(), 'name': obraService.getTitle(), 'title': serverService.capitalizeWord(obraService.getObTitle()), 'icon': obraService.getIcon()});
                        meta.archivo = ({'fields': archivoService.getFields(), 'name': archivoService.getTitle(), 'title': serverService.capitalizeWord(archivoService.getObTitle()), 'icon': archivoService.getIcon()});
                        meta.usuario = ({'fields': usuarioService.getFields(), 'name': usuarioService.getTitle(), 'title': serverService.capitalizeWord(usuarioService.getObTitle()), 'icon': usuarioService.getIcon()});
                        meta.tipousuario = ({'fields': tipousuarioService.getFields(), 'name': tipousuarioService.getTitle(), 'title': serverService.capitalizeWord(tipousuarioService.getObTitle()), 'icon': tipousuarioService.getIcon()});
                        return meta;
                    }
                }
            }])
        .value('version', '1');
