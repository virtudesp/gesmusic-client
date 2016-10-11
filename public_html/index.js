openAusias.controller('HeaderController', ['$scope', '$location', 'serverService', 'sessionService',
    function ($scope, $location, serverService, sessionService) {
        $scope.username = "";
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.isSessionActive = function () {
            //console.log('---> index: ')
            //console.log('session: ' + sessionService.isSessionActive())
            //console.log('username: ' + sessionService.getUsername())
            if (sessionService.isSessionActive()) {
                $scope.username = sessionService.getUsername();
                return true;
            } else {
                return false;
            }
//            serverService.promise_patch('op=getstatus&db=scroom').then(
//                    function successCallback(response) {
//                        if (response.code == 200) {
//                            //$scope.username = "pepe";
            //return true;
//                        } else {
//                            return false;
//                        }
//                    },
//                    function errorCallback(response, status) {
//                        return false;
//                    });
        };
    }]);