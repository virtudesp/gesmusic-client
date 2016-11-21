'use strict';
moduloSistema.controller('LoginController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {

        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";

        $scope.user = {};
        $scope.user.username = 'rafael';
        $scope.user.password = 'rafael';



        $scope.login = function () {

            serverService.getLoginPromise($scope.user.username, $scope.user.password).then(function (response) {
                if (response.status == 200) {                    
                    sessionService.setSessionActive();
                    sessionService.setUsername(response.data.message);
                    $location.path('home');
                } else {
                    console.log("patch <>200");
                    sessionService.setSessionInactive();
                    sessionService.setUsername('');
                    return false;
                }
            }, function errorCallback(response, status) {
                sessionService.setSessionInactive();
                sessionService.setUsername('');
                console.log("patch error" + status);
                return false;
            });




//            if (response) {
//                sessionService.setSessionActive();
//                sessionService.setUsername(response.message);
//                $location.path('home');
//            } else {
//                sessionService.setSessionInactive();
//                sessionService.setUsername('');
//            }
//            });
        };

    }
]
        );


