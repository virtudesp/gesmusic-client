/*
 * Copyright (c) 2019 by Virtudes Planells Tatay
 *
 * sisane: The stunning micro-library that helps you to develop easily
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/virtudesp/sisane
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
    'actoControllers',
    'agrupacionControllers',
    'archivoControllers',
    'compositorControllers',
    'elencoControllers',
    'miembroControllers',
    'obraControllers',
    'participaControllers',
    'repertorioControllers',
    'rolControllers',
    'sociedadControllers',
    'tipomiembroControllers',
    'tipousuarioControllers',
    'usuarioControllers',
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
        $routeProvider.when('/acto/new/:id?', {templateUrl: 'js/acto/new.html', controller: 'ActoNewController'});
        $routeProvider.when('/acto/edit/:id', {templateUrl: 'js/acto/edit.html', controller: 'ActoEditController'});
        $routeProvider.when('/acto/remove/:id', {templateUrl: 'js/acto/remove.html', controller: 'ActoRemoveController'});
        $routeProvider.when('/acto/historial/:id', {templateUrl: 'js/acto/historial.html', controller: 'ActoHistorialController'});
        $routeProvider.when('/acto/plist/:page?/:rpp?', {templateUrl: 'js/acto/plist.html', controller: 'ActoPListController'});
        $routeProvider.when('/acto/selection/:page?/:rpp?', {templateUrl: 'js/acto/selection.html', controller: 'ActoSelectionController'});
        //------------
        $routeProvider.when('/agrupacion/new/:id?', {templateUrl: 'js/agrupacion/new.html', controller: 'AgrupacionNewController'});
        $routeProvider.when('/agrupacion/edit/:id', {templateUrl: 'js/agrupacion/edit.html', controller: 'AgrupacionEditController'});
        $routeProvider.when('/agrupacion/remove/:id', {templateUrl: 'js/agrupacion/remove.html', controller: 'AgrupacionRemoveController'});
        $routeProvider.when('/agrupacion/plist/:page?/:rpp?', {templateUrl: 'js/agrupacion/plist.html', controller: 'AgrupacionPListController'});
        $routeProvider.when('/agrupacion/selection/:page?/:rpp?', {templateUrl: 'js/agrupacion/selection.html', controller: 'AgrupacionSelectionController'});
        //------------
        $routeProvider.when('/archivo/new/:id?', {templateUrl: 'js/archivo/new.html', controller: 'ArchivoNewController'});
        $routeProvider.when('/archivo/edit/:id', {templateUrl: 'js/archivo/edit.html', controller: 'ArchivoEditController'});
        $routeProvider.when('/archivo/remove/:id', {templateUrl: 'js/archivo/remove.html', controller: 'ArchivoRemoveController'});
        $routeProvider.when('/archivo/plist/:page?/:rpp?', {templateUrl: 'js/archivo/plist.html', controller: 'ArchivoPListController'});
        $routeProvider.when('/archivo/selection/:page?/:rpp?', {templateUrl: 'js/archivo/selection.html', controller: 'ArchivoSelectionController'});
        //------------
        $routeProvider.when('/compositor/new/:id?', {templateUrl: 'js/compositor/new.html', controller: 'CompositorNewController'});
        $routeProvider.when('/compositor/edit/:id', {templateUrl: 'js/compositor/edit.html', controller: 'CompositorEditController'});
        $routeProvider.when('/compositor/remove/:id', {templateUrl: 'js/compositor/remove.html', controller: 'CompositorRemoveController'});
        $routeProvider.when('/compositor/plist/:page?/:rpp?', {templateUrl: 'js/compositor/plist.html', controller: 'CompositorPListController'});
        $routeProvider.when('/compositor/selection/:page?/:rpp?', {templateUrl: 'js/compositor/selection.html', controller: 'CompositorSelectionController'});
        // Controladores para obrasXcompositor
        $routeProvider.when('/compositor/obrasxcompositor/remove', {templateUrl: 'js/compositor/obrasxcompositor/remove.html', controller: 'ObrasXCompositorRemovepopController'});
        $routeProvider.when('/compositor/obrasxcompositor/edit/:id?/:foreign?', {templateUrl: 'js/compositor/obrasxcompositor/edit.html', controller: 'ObrasXCompositorEditController'});
        $routeProvider.when('/compositor/obrasxcompositor/new/:foreign?', {templateUrl: 'js/compositor/obrasxcompositor/new.html', controller: 'ObrasXCompositorNewController'});
        $routeProvider.when('/compositor/obrasxcompositor/plist/:id?', {templateUrl: 'js/compositor/obrasxcompositor/plist.html', controller: 'ObrasXCompositorPListController'});
        //------------
        $routeProvider.when('/elenco/new/:id?', {templateUrl: 'js/elenco/new.html', controller: 'ElencoNewController'});
        $routeProvider.when('/elenco/edit/:id', {templateUrl: 'js/elenco/edit.html', controller: 'ElencoEditController'});
        $routeProvider.when('/elenco/remove/:id', {templateUrl: 'js/elenco/remove.html', controller: 'ElencoRemoveController'});
        $routeProvider.when('/elenco/chooser/:page?/:rpp?', {templateUrl: 'js/elenco/chooser.html', controller: 'ElencoChooserController'});
        $routeProvider.when('/elenco/plist/:id/:page?/:rpp?', {templateUrl: 'js/elenco/plist.html', controller: 'ElencoPListController'});
        $routeProvider.when('/elenco/selection/:page?/:rpp?', {templateUrl: 'js/elenco/selection.html', controller: 'ElencoSelectionController'});
        //------------
        $routeProvider.when('/miembro/new/:id?', {templateUrl: 'js/miembro/new.html', controller: 'MiembroNewController'});
        $routeProvider.when('/miembro/edit/:id', {templateUrl: 'js/miembro/edit.html', controller: 'MiembroEditController'});
        $routeProvider.when('/miembro/plistxtipo/:id/:page?/:rpp?', {templateUrl: 'js/miembro/plistxtipo.html', controller: 'MiembroPlistXTipoController'});
        $routeProvider.when('/miembro/remove/:id', {templateUrl: 'js/miembro/remove.html', controller: 'MiembroRemoveController'});
        $routeProvider.when('/miembro/plist/:page?/:rpp?', {templateUrl: 'js/miembro/plist.html', controller: 'MiembroPListController'});
        $routeProvider.when('/miembro/selection/:page?/:rpp?', {templateUrl: 'js/miembro/selection.html', controller: 'MiembroSelectionController'});
        //------------  
        $routeProvider.when('/obra/new/:id?', {templateUrl: 'js/obra/new.html', controller: 'ObraNewController'});
        $routeProvider.when('/obra/edit/:id/:foreign', {templateUrl: 'js/obra/edit.html', controller: 'ObraEditController'});
        $routeProvider.when('/obra/remove/:id', {templateUrl: 'js/obra/remove.html', controller: 'ObraRemoveController'});
        $routeProvider.when('/obra/plist/:page?/:rpp?', {templateUrl: 'js/obra/plist.html', controller: 'ObraPListController'});
        $routeProvider.when('/obra/selection/:page?/:rpp?', {templateUrl: 'js/obra/selection.html', controller: 'ObraSelectionController'});
        //------------  
        $routeProvider.when('/participa/new/:foreign?', {templateUrl: 'js/participa/new.html', controller: 'ParticipaNewController'});
        $routeProvider.when('/participa/edit/:id', {templateUrl: 'js/participa/edit.html', controller: 'ParticipaEditController'});
        $routeProvider.when('/participa/remove/:id', {templateUrl: 'js/participa/remove.html', controller: 'ParticipaRemoveController'});
        $routeProvider.when('/participa/plist/:id/:page?/:rpp?', {templateUrl: 'js/participa/plist.html', controller: 'ParticipaPListController'});
        //------------
        $routeProvider.when('/repertorio/new/:foreign/:foreign2', {templateUrl: 'js/repertorio/new.html', controller: 'RepertorioNewController'});
        $routeProvider.when('/repertorio/edit/:id', {templateUrl: 'js/repertorio/edit.html', controller: 'RepertorioEditController'});
        $routeProvider.when('/repertorio/remove/:id/:foreign', {templateUrl: 'js/repertorio/remove.html', controller: 'RepertorioRemoveController'});
        $routeProvider.when('/repertorio/plist/:foreign/:foreign2/:page?/:rpp?', {templateUrl: 'js/repertorio/plist.html', controller: 'RepertorioPListController'});
        $routeProvider.when('/repertorio/selection/:page?/:rpp?', {templateUrl: 'js/repertorio/selection.html', controller: 'RepertorioSelectionController'});
        //------------
        $routeProvider.when('/rol/new/:id?', {templateUrl: 'js/rol/new.html', controller: 'RolNewController'});
        $routeProvider.when('/rol/edit/:id', {templateUrl: 'js/rol/edit.html', controller: 'RolEditController'});
        $routeProvider.when('/rol/remove/:id', {templateUrl: 'js/rol/remove.html', controller: 'RolRemoveController'});
        $routeProvider.when('/rol/plist/:page?/:rpp?', {templateUrl: 'js/rol/plist.html', controller: 'RolPListController'});
        $routeProvider.when('/rol/selection/:page?/:rpp?', {templateUrl: 'js/rol/selection.html', controller: 'RolSelectionController'});
        //------------
        $routeProvider.when('/sociedad/new/:id?', {templateUrl: 'js/sociedad/new.html', controller: 'SociedadNewController'});
        $routeProvider.when('/sociedad/edit/:id', {templateUrl: 'js/sociedad/edit.html', controller: 'SociedadEditController'});
        $routeProvider.when('/sociedad/remove/:id', {templateUrl: 'js/sociedad/remove.html', controller: 'SociedadRemoveController'});
        $routeProvider.when('/sociedad/plist/:page?/:rpp?', {templateUrl: 'js/sociedad/plist.html', controller: 'SociedadPListController'});
        $routeProvider.when('/sociedad/selection/:page?/:rpp?', {templateUrl: 'js/sociedad/selection.html', controller: 'SociedadSelectionController'});
        //------------
        $routeProvider.when('/tipomiembro/new/:id?', {templateUrl: 'js/tipomiembro/new.html', controller: 'TipomiembroNewController'});
        $routeProvider.when('/tipomiembro/edit/:id', {templateUrl: 'js/tipomiembro/edit.html', controller: 'TipomiembroEditController'});
        $routeProvider.when('/tipomiembro/remove/:id', {templateUrl: 'js/tipomiembro/remove.html', controller: 'TipomiembroRemoveController'});
        $routeProvider.when('/tipomiembro/plist/:page?/:rpp?', {templateUrl: 'js/tipomiembro/plist.html', controller: 'TipomiembroPListController'});
        $routeProvider.when('/tipomiembro/selection/:page?/:rpp?', {templateUrl: 'js/tipomiembro/selection.html', controller: 'TipomiembroSelectionController'});
        // Controladores para miembrosxtipomiembro
        $routeProvider.when('/tipomiembro/miembrosxtipomiembro/remove', {templateUrl: 'js/tipomiembro/miembrosxtipomiembro/remove.html', controller: 'MiembrosXTipomiembroRemovepopController'});
        $routeProvider.when('/tipomiembro/miembrosxtipomiembro/edit/:id?/:foreign?/:tipomiembro?', {templateUrl: 'js/tipomiembro/miembrosxtipomiembro/edit.html', controller: 'MiembrosXTipomiembroEditController'});
        $routeProvider.when('/tipomiembro/miembrosxtipomiembro/new/:foreign?/:tipomiembro?', {templateUrl: 'js/tipomiembro/miembrosxtipomiembro/new.html', controller: 'MiembrosXTipomiembroNewController'});
        $routeProvider.when('/tipomiembro/miembrosxtipomiembro/plist/:id?', {templateUrl: 'js/tipomiembro/miembrosxtipomiembro/plist.html', controller: 'MiembrosXTipomiembroPListController'});
        //------------ 
        $routeProvider.when('/tipousuario/new/:id?', {templateUrl: 'js/tipousuario/new.html', controller: 'TipousuarioNewController'});
        $routeProvider.when('/tipousuario/edit/:id', {templateUrl: 'js/tipousuario/edit.html', controller: 'TipousuarioEditController'});
        $routeProvider.when('/tipousuario/remove/:id', {templateUrl: 'js/tipousuario/remove.html', controller: 'TipousuarioRemoveController'});
        $routeProvider.when('/tipousuario/plist/:page?/:rpp?', {templateUrl: 'js/tipousuario/plist.html', controller: 'TipousuarioPListController'});
        $routeProvider.when('/tipousuario/selection/:page?/:rpp?', {templateUrl: 'js/tipousuario/selection.html', controller: 'TipousuarioSelectionController'});
        // Controladores para usuariosxtipousuario
        $routeProvider.when('/usuariosxtipousuario/remove', {templateUrl: 'js/usuariosxtipousuario/remove.html', controller: 'UsuariosXTipousuarioRemovepopController'});
        $routeProvider.when('/usuariosxtipousuario/edit/:id?/:foreign?/:tipousuario?', {templateUrl: 'js/usuariosxtipousuario/edit.html', controller: 'UsuariosXTipousuarioEditController'});
        $routeProvider.when('/usuariosxtipousuario/new/:foreign?/:tipousuario?', {templateUrl: 'js/usuariosxtipousuario/new.html', controller: 'UsuariosXTipousuarioNewController'});
        $routeProvider.when('/usuariosxtipousuario/plist/:id', {templateUrl: 'js/usuariosxtipousuario/plist.html', controller: 'UsuariosXTipousuarioPListController'});
        //------------
        $routeProvider.when('/usuario/new/:id?', {templateUrl: 'js/usuario/new.html', controller: 'UsuarioNewController'});
        $routeProvider.when('/usuario/edit/:id', {templateUrl: 'js/usuario/edit.html', controller: 'UsuarioEditController'});
        $routeProvider.when('/usuario/remove/:id', {templateUrl: 'js/usuario/remove.html', controller: 'UsuarioRemoveController'});
        $routeProvider.when('/usuario/plist/:page?/:rpp?', {templateUrl: 'js/usuario/plist.html', controller: 'UsuarioPListController'});
        $routeProvider.when('/usuario/selection/:page?/:rpp?', {templateUrl: 'js/usuario/selection.html', controller: 'UsuarioSelectionController'});
        //------------
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
var moduloActo = angular.module('actoControllers', []);
var moduloAgrupacion = angular.module('agrupacionControllers', []);
var moduloArchivo = angular.module('archivoControllers', []);
var moduloCompositor = angular.module('compositorControllers', []);
var moduloElenco = angular.module('elencoControllers', []);
var moduloMiembro = angular.module('miembroControllers', []);
var moduloObra = angular.module('obraControllers', []);
var moduloParticipa = angular.module('participaControllers', []);
var moduloRepertorio = angular.module('repertorioControllers', []);
var moduloRol = angular.module('rolControllers', []);
var moduloSociedad = angular.module('sociedadControllers', []);
var moduloTipomiembro = angular.module('tipomiembroControllers', []);
var moduloTipousuario = angular.module('tipousuarioControllers', []);
var moduloUsuario = angular.module('usuarioControllers', []);
var moduloUsuariosXTipousuario = angular.module('usuariosxtipousuariosControllers', []);

//-------------
var moduloDirectivas = angular.module('Directives', []);
var moduloServicios = angular.module('Services', []);
var moduloFiltros = angular.module('Filters', []);
