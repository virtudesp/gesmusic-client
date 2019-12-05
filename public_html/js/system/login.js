'use strict';
moduloSistema.controller('LoginController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";
        $scope.user = {};
        if (serverService.debugging()) {
            $scope.user.username = 'cacun';
            $scope.user.password = 'cacun';
        }
        $scope.login = function () {
            serverService.getLoginPromise($scope.user.username, $scope.user.password).then(function (response) {
                if (response.status == 200) {
                    sessionService.setSessionActive();
                    sessionService.setUsername(response.data.message.login);
                    sessionService.setId(response.data.message.id);
                    $scope.username = sessionService.getUsername(response.data.message.login);
                    $location.path('home');
                } else {
                    sessionService.setSessionInactive();
                    sessionService.setUsername('');
                    return false;
                }
            }, function errorCallback(response, status) {
                sessionService.setSessionInactive();
                sessionService.setUsername('');
                return false;
            });
        };

    }]);


