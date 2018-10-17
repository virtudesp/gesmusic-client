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
//-------------
var gesmusic = angular.module('myApp', [
    'ngRoute',
    'Filters',
    'Services',
    'Directives',
    'systemControllers',
    'entidadControllers',
    'tipoentidadControllers',
    'sociedadControllers',
//    'usuarioControllers',
//    'tipousuarioControllers',
    'ui.bootstrap',
    'ngSanitize',
//    'chart.js'
]);
//-------------
//---html5 mode off; setting up pushState needs server urlrewritting, so quitting...-------
gesmusic.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            //requireBase: false,
            enabled: true
        });
    }]);
//-------------
gesmusic.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
//-------------
gesmusic.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/system/home.html', controller: 'HomeController'});
        //------------
        $routeProvider.when('/login', {templateUrl: 'js/system/login.html', controller: 'LoginController'});
        $routeProvider.when('/logout', {templateUrl: 'js/system/logout.html', controller: 'LogoutController'});
        $routeProvider.when('/home', {templateUrl: 'js/system/home.html', controller: 'HomeController'});
        $routeProvider.when('/license', {templateUrl: 'js/system/license.html', controller: 'LicenseController'});
        $routeProvider.when('/passchange', {templateUrl: 'js/system/passchange.html', controller: 'PasschangeController'});
        //------------
        $routeProvider.when('/entidad/view/:id', {templateUrl: 'js/entidad/view.html', controller: 'EntidadViewController'});
        $routeProvider.when('/entidad/new/:id?', {templateUrl: 'js/entidad/new.html', controller: 'EntidadNewController'});
        $routeProvider.when('/entidad/edit/:id', {templateUrl: 'js/entidad/edit.html', controller: 'EntidadEditController'});
        $routeProvider.when('/entidad/remove/:id', {templateUrl: 'js/entidad/remove.html', controller: 'EntidadRemoveController'});
        $routeProvider.when('/entidad/plist/:page?/:rpp?', {templateUrl: 'js/entidad/plist.html', controller: 'EntidadPListController'});
        $routeProvider.when('/entidad/selection/:page?/:rpp?', {templateUrl: 'js/entidad/selection.html', controller: 'EntidadSelectionController'});
        //------------  
        $routeProvider.when('/tipoentidad/view/:id', {templateUrl: 'js/tipoentidad/view.html', controller: 'TipovViewController'});
        $routeProvider.when('/tipoentidad/new/:id?', {templateUrl: 'js/tipoentidad/new.html', controller: 'TipovNewController'});
        $routeProvider.when('/tipoentidad/edit/:id', {templateUrl: 'js/tipoentidad/edit.html', controller: 'TipoentidadEditController'});
        $routeProvider.when('/tipoentidad/remove/:id', {templateUrl: 'js/tipov/remove.html', controller: 'TipoentidadRemoveController'});
        $routeProvider.when('/tipoentidad/plist/:page?/:rpp?', {templateUrl: 'js/tipoentidad/plist.html', controller: 'TipoentidadPListController'});
        $routeProvider.when('/tipoentidad/selection/:page?/:rpp?', {templateUrl: 'js/tipov/selection.html', controller: 'TipoentidadSelectionController'});
        //------------
        $routeProvider.when('/sociedad/view/:id', {templateUrl: 'js/sociedad/view.html', controller: 'SociedadViewController'});
        $routeProvider.when('/sociedad/new/:id?', {templateUrl: 'js/sociedad/new.html', controller: 'SociedadNewController'});
        $routeProvider.when('/sociedad/edit/:id', {templateUrl: 'js/sociedad/edit.html', controller: 'SociedadEditController'});
        $routeProvider.when('/sociedad/remove/:id', {templateUrl: 'js/sociedad/remove.html', controller: 'SociedadRemoveController'});
        $routeProvider.when('/sociedad/plist/:page?/:rpp?', {templateUrl: 'js/sociedad/plist.html', controller: 'SociedadPListController'});
        $routeProvider.when('/sociedad/selection/:page?/:rpp?', {templateUrl: 'js/sociedad/selection.html', controller: 'SociedadSelectionController'});
        //------------
//        $routeProvider.when('/usuario/view/:id', {templateUrl: 'js/usuario/view.html', controller: 'UsuarioViewController'});
//        $routeProvider.when('/usuario/new/:id?', {templateUrl: 'js/usuario/new.html', controller: 'UsuarioNewController'});
//        $routeProvider.when('/usuario/edit/:id', {templateUrl: 'js/usuario/edit.html', controller: 'UsuarioEditController'});
//        $routeProvider.when('/usuario/remove/:id', {templateUrl: 'js/usuario/remove.html', controller: 'UsuarioRemoveController'});
//        $routeProvider.when('/usuario/plist/:page?/:rpp?', {templateUrl: 'js/usuario/plist.html', controller: 'UsuarioPListController'});
//        $routeProvider.when('/usuario/selection/:page?/:rpp?', {templateUrl: 'js/usuario/selection.html', controller: 'UsuarioSelectionController'});
//        //------------
//        $routeProvider.when('/tipousuario/view/:id', {templateUrl: 'js/tipousuario/view.html', controller: 'TipousuarioViewController'});
//        $routeProvider.when('/tipousuario/new/:id?', {templateUrl: 'js/tipousuario/new.html', controller: 'TipousuarioNewController'});
//        $routeProvider.when('/tipousuario/edit/:id', {templateUrl: 'js/tipousuario/edit.html', controller: 'TipousuarioEditController'});
//        $routeProvider.when('/tipousuario/remove/:id', {templateUrl: 'js/tipousuario/remove.html', controller: 'TipousuarioRemoveController'});
//        $routeProvider.when('/tipousuario/plist/:page?/:rpp?', {templateUrl: 'js/tipousuario/plist.html', controller: 'TipousuarioPListController'});
//        $routeProvider.when('/tipousuario/selection/:page?/:rpp?', {templateUrl: 'js/tipousuario/selection.html', controller: 'TipousuarioSelectionController'});
//        //------------
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
//-------------
gesmusic.run(function ($rootScope, $location, serverService, sessionService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        sessionService.setSessionInactive();
        sessionService.setUsername('');
        serverService.getSessionPromise().then(function (response) {
            if (response['status'] == 200) {
                sessionService.setSessionActive();
                sessionService.setUsername(response.data.message.login);
                sessionService.setId(response.data.message.id);
            } else {
                sessionService.setSessionInactive();
                sessionService.setUsername('');
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/home' || nextUrl == '/login' || nextUrl == '/license') {

                } else {
                    $location.path("/login");
                }
            }
        }).catch(function (data) {
            sessionService.setSessionInactive();
            sessionService.setUsername('');
            var nextUrl = next.$$route.originalPath;
            if (nextUrl == '/home' || nextUrl == '/login' || nextUrl == '/license') {
            } else {
                $location.path("/login");
            }
        });
    });
});
//-------------
var moduloSistema = angular.module('systemControllers', []);
var moduloEntidad = angular.module('entidadControllers', []);
var moduloTipoentidad = angular.module('tipoentidadControllers', []);
var moduloSociedad = angular.module('sociedadControllers', []);
//var moduloUsuario = angular.module('usuarioControllers', []);
//var moduloTipousuario = angular.module('tipousuarioControllers', []);

//-------------
var moduloDirectivas = angular.module('Directives', []);
var moduloServicios = angular.module('Services', []);
var moduloFiltros = angular.module('Filters', []);
