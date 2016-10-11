'use strict';
moduloSistema.controller('LoginController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {

        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";

        $scope.user = {};
        $scope.user.username = 'rafael';
        $scope.user.password = 'rafael';



        $scope.login = function () {
            serverService.patch('op=login&user=' + $scope.user.username + '&pass=' + $scope.user.password ).then(function (result) {
                //Data.toast(results);
                if (result) {
                    if (result.status == 200) {
                        //$rootScope.authenticated = true;
                        //$rootScope.username = "rafa";
                        sessionService.setSessionActive();
                        sessionService.setUsername('rafa');
                        console.log('---> login: ')
                        console.log('session: ' + sessionService.isSessionActive())
                        console.log('username: ' + sessionService.getUsername())
                        $location.path('home');
                    }
                } else {
                    sessionService.setSessionInactive();
                    sessionService.setUsername('');
                    //$rootScope.username = "";
                    //$rootScope.authenticated = false;
                }
            });


//            serverService.getDataFromPromise(
//                    serverService.promise_patch('ob=usuario&op=login&user=' + $scope.user.username + '&pass=' + $scope.user.password + '&db=scroom')).then(
//                    function successCallback(response) {
//                        if (response.code == 200) {
//                            sessionService.setObject($scope.user);
//                            alert('ok..');
//                            $("#infoPanel").html($scope.user.username); //poner el nombre del user
//                            //obtener datos del usuario
//                        }
//                        // this callback will be called asynchronously
//                        // when the response is available
//                    }, function errorCallback(response, status) {
//                console.log("HTTP ERROR STATUS: " + $scope.data.error.status);
//                alert('error..');
//            });
        }

    }
]
        );


