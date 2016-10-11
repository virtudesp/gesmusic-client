'use strict';
moduloSistema.controller('LogoutController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {

        $scope.title = "Bye";
        $scope.icon = "fa-file-text-o";

        serverService.patch('op=logout').then(function (result) {

            if (result) {
                if (result.status == 200) {
                    //$rootScope.authenticated = true;
                    //$rootScope.username = "rafa";
                    sessionService.setSessionInactive();
                    sessionService.setUsername('');
                    //console.log('---> logout: ')
                    //console.log('session: ' + sessionService.isSessionActive())
                    //console.log('username: ' + sessionService.getUsername())
                    $location.path('home');
                }
            } else {
                sessionService.setSessionInactive();
                sessionService.setUsername('');
                //$rootScope.username = "";
                //$rootScope.authenticated = false;
            }
        });



    }
]
        );


