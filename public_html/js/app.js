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
var sisane = angular.module('myApp', [
    'ngRoute',
    'Filters',
    'Services',
    'Directives',
    'systemControllers',
    'usuarioControllers',
    'tipousuarioControllers',
    'medicamentoControllers',
    'posologiaControllers',
    'servicioControllers',
    'ui.bootstrap',
    'ngSanitize'
]);
//-------------
//---html5 mode off; setting up pushState needs server urlrewritting, so quitting...-------
//sisane.config(['$locationProvider', function ($locationProvider) {
//        $locationProvider.html5Mode({
//            //requireBase: false,
//            enabled: true            
//        });
//    }]);
//-------------
sisane.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
//-------------
sisane.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/system/home.html', controller: 'HomeController'});
        //------------
        $routeProvider.when('/login', {templateUrl: 'js/system/login.html', controller: 'LoginController'});
        $routeProvider.when('/logout', {templateUrl: 'js/system/logout.html', controller: 'LogoutController'});
        $routeProvider.when('/home', {templateUrl: 'js/system/home.html', controller: 'HomeController'});
        $routeProvider.when('/license', {templateUrl: 'js/system/license.html', controller: 'LicenseController'});
        $routeProvider.when('/passchange', {templateUrl: 'js/system/passchange.html', controller: 'PasschangeController'});
        //------------       
        $routeProvider.when('/usuario/view/:id', {templateUrl: 'js/usuario/view.html', controller: 'UsuarioViewController'});
        $routeProvider.when('/usuario/new/:id?', {templateUrl: 'js/usuario/new.html', controller: 'UsuarioNewController'});
        $routeProvider.when('/usuario/edit/:id', {templateUrl: 'js/usuario/edit.html', controller: 'UsuarioEditController'});
        $routeProvider.when('/usuario/remove/:id', {templateUrl: 'js/usuario/remove.html', controller: 'UsuarioRemoveController'});
        $routeProvider.when('/usuario/plist/:page?/:rpp?', {templateUrl: 'js/usuario/plist.html', controller: 'UsuarioPListController'});
        $routeProvider.when('/usuario/selection/:page?/:rpp?', {templateUrl: 'js/usuario/selection.html', controller: 'UsuarioSelectionController'});
        //------------
        $routeProvider.when('/posologia/view/:id', {templateUrl: 'js/posologia/view.html', controller: 'PosologiaViewController'});
        $routeProvider.when('/posologia/new/:id?', {templateUrl: 'js/posologia/new.html', controller: 'PosologiaNewController'});
        $routeProvider.when('/posologia/edit/:id', {templateUrl: 'js/posologia/edit.html', controller: 'PosologiaEditController'});
        $routeProvider.when('/posologia/remove/:id', {templateUrl: 'js/posologia/remove.html', controller: 'PosologiaRemoveController'});
        $routeProvider.when('/posologia/plist/:page?/:rpp?', {templateUrl: 'js/posologia/plist.html', controller: 'PosologiaPListController'});
        $routeProvider.when('/posologia/selection/:page?/:rpp?', {templateUrl: 'js/posologia/selection.html', controller: 'PosologiaSelectionController'});
        //------------
        $routeProvider.when('/tipousuario/view/:id', {templateUrl: 'js/tipousuario/view.html', controller: 'TipousuarioViewController'});
        $routeProvider.when('/tipousuario/new/:id?', {templateUrl: 'js/tipousuario/new.html', controller: 'TipousuarioNewController'});
        $routeProvider.when('/tipousuario/edit/:id', {templateUrl: 'js/tipousuario/edit.html', controller: 'TipousuarioEditController'});
        $routeProvider.when('/tipousuario/remove/:id', {templateUrl: 'js/tipousuario/remove.html', controller: 'TipousuarioRemoveController'});
        $routeProvider.when('/tipousuario/plist/:page?/:rpp?', {templateUrl: 'js/tipousuario/plist.html', controller: 'TipousuarioPListController'});
        $routeProvider.when('/tipousuario/selection/:page?/:rpp?', {templateUrl: 'js/tipousuario/selection.html', controller: 'TipousuarioSelectionController'});
        //------------
        $routeProvider.when('/medicamento/view/:id', {templateUrl: 'js/medicamento/view.html', controller: 'MedicamentoViewController'});
        $routeProvider.when('/medicamento/new/:id?', {templateUrl: 'js/medicamento/new.html', controller: 'MedicamentoNewController'});
        $routeProvider.when('/medicamento/edit/:id', {templateUrl: 'js/medicamento/edit.html', controller: 'MedicamentoEditController'});
        $routeProvider.when('/medicamento/remove/:id', {templateUrl: 'js/medicamento/remove.html', controller: 'MedicamentoRemoveController'});
        $routeProvider.when('/medicamento/plist/:page?/:rpp?', {templateUrl: 'js/medicamento/plist.html', controller: 'MedicamentoPListController'});
        $routeProvider.when('/medicamento/selection/:page?/:rpp?', {templateUrl: 'js/medicamento/selection.html', controller: 'MedicamentoSelectionController'});
        //------------
        $routeProvider.when('/servicio/view/:id', {templateUrl: 'js/servicio/view.html', controller: 'ServicioViewController'});
        $routeProvider.when('/servicio/new/:id?', {templateUrl: 'js/servicio/new.html', controller: 'ServicioNewController'});
        $routeProvider.when('/servicio/edit/:id', {templateUrl: 'js/servicio/edit.html', controller: 'ServicioEditController'});
        $routeProvider.when('/servicio/remove/:id', {templateUrl: 'js/servicio/remove.html', controller: 'ServicioRemoveController'});
        $routeProvider.when('/servicio/plist/:page?/:rpp?', {templateUrl: 'js/servicio/plist.html', controller: 'ServicioPListController'});
        $routeProvider.when('/servicio/selection/:page?/:rpp?', {templateUrl: 'js/servicio/selection.html', controller: 'ServicioSelectionController'});
        //------------
        
        
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
//-------------
sisane.run(function ($rootScope, $location, serverService, sessionService) {
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
var moduloUsuario = angular.module('usuarioControllers', []);
var moduloPost = angular.module('postControllers', []);
var moduloPosologia = angular.module('posologiaControllers', []);
var moduloTipousuario = angular.module('tipousuarioControllers', []);
var moduloMedicamento = angular.module('medicamentoControllers', []);
var moduloServicio = angular.module('servicioControllers', []);

//-------------
var moduloDirectivas = angular.module('Directives', []);
var moduloServicios = angular.module('Services', []);
var moduloFiltros = angular.module('Filters', []);

