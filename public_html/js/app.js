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
    'userControllers',
    'usertypeControllers',
    'postControllers',
    'productControllers',
    'producttypeControllers',
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
        $routeProvider.when('/user/view/:id', {templateUrl: 'js/user/view.html', controller: 'UserViewController'});
        $routeProvider.when('/user/new/:id?', {templateUrl: 'js/user/new.html', controller: 'UserNewController'});
        $routeProvider.when('/user/edit/:id', {templateUrl: 'js/user/edit.html', controller: 'UserEditController'});
        $routeProvider.when('/user/remove/:id', {templateUrl: 'js/user/remove.html', controller: 'UserRemoveController'});
        $routeProvider.when('/user/plist/:page?/:rpp?', {templateUrl: 'js/user/plist.html', controller: 'UserPListController'});
        $routeProvider.when('/user/selection/:page?/:rpp?', {templateUrl: 'js/user/selection.html', controller: 'UserSelectionController'});
        //------------
        $routeProvider.when('/post/view/:id', {templateUrl: 'js/post/view.html', controller: 'PostViewController'});
        $routeProvider.when('/post/new/:id?', {templateUrl: 'js/post/new.html', controller: 'PostNewController'});
        $routeProvider.when('/post/edit/:id', {templateUrl: 'js/post/edit.html', controller: 'PostEditController'});
        $routeProvider.when('/post/remove/:id', {templateUrl: 'js/post/remove.html', controller: 'PostRemoveController'});
        $routeProvider.when('/post/plist/:page?/:rpp?', {templateUrl: 'js/post/plist.html', controller: 'PostPListController'});
        $routeProvider.when('/post/selection/:page?/:rpp?', {templateUrl: 'js/post/selection.html', controller: 'PostSelectionController'});
        //------------
        $routeProvider.when('/usertype/view/:id', {templateUrl: 'js/usertype/view.html', controller: 'UsertypeViewController'});
        $routeProvider.when('/usertype/new/:id?', {templateUrl: 'js/usertype/new.html', controller: 'UsertypeNewController'});
        $routeProvider.when('/usertype/edit/:id', {templateUrl: 'js/usertype/edit.html', controller: 'UsertypeEditController'});
        $routeProvider.when('/usertype/remove/:id', {templateUrl: 'js/usertype/remove.html', controller: 'UsertypeRemoveController'});
        $routeProvider.when('/usertype/plist/:page?/:rpp?', {templateUrl: 'js/usertype/plist.html', controller: 'UsertypePListController'});
        $routeProvider.when('/usertype/selection/:page?/:rpp?', {templateUrl: 'js/usertype/selection.html', controller: 'UsertypeSelectionController'});
        //------------
        $routeProvider.when('/product/view/:id', {templateUrl: 'js/product/view.html', controller: 'ProductViewController'});
        $routeProvider.when('/product/new/:id?', {templateUrl: 'js/product/new.html', controller: 'ProductNewController'});
        $routeProvider.when('/product/edit/:id', {templateUrl: 'js/product/edit.html', controller: 'ProductEditController'});
        $routeProvider.when('/product/remove/:id', {templateUrl: 'js/product/remove.html', controller: 'ProductRemoveController'});
        $routeProvider.when('/product/plist/:page?/:rpp?', {templateUrl: 'js/product/plist.html', controller: 'ProductPListController'});
        $routeProvider.when('/product/selection/:page?/:rpp?', {templateUrl: 'js/product/selection.html', controller: 'ProductSelectionController'});
        //------------
        $routeProvider.when('/producttype/view/:id', {templateUrl: 'js/producttype/view.html', controller: 'ProducttypeViewController'});
        $routeProvider.when('/producttype/new/:id?', {templateUrl: 'js/producttype/new.html', controller: 'ProducttypeNewController'});
        $routeProvider.when('/producttype/edit/:id', {templateUrl: 'js/producttype/edit.html', controller: 'ProducttypeEditController'});
        $routeProvider.when('/producttype/remove/:id', {templateUrl: 'js/producttype/remove.html', controller: 'ProducttypeRemoveController'});
        $routeProvider.when('/producttype/plist/:page?/:rpp?', {templateUrl: 'js/producttype/plist.html', controller: 'ProducttypePListController'});
        $routeProvider.when('/producttype/selection/:page?/:rpp?', {templateUrl: 'js/producttype/selection.html', controller: 'ProducttypeSelectionController'});
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
var moduloUser = angular.module('userControllers', []);
var moduloPost = angular.module('postControllers', []);
var moduloUsertype = angular.module('usertypeControllers', []);
var moduloProduct = angular.module('productControllers', []);
var moduloProducttype = angular.module('producttypeControllers', []);
//-------------
var moduloDirectivas = angular.module('Directives', []);
var moduloServicios = angular.module('Services', []);
var moduloFiltros = angular.module('Filters', []);
