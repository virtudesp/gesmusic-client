sisane.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService',
    function ($scope, $location, serverService, sessionService) {
        $scope.username = "";
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.isSessionActive = function () {
            if (sessionService.isSessionActive()) {
                $scope.username = sessionService.getUsername();                
                return true;
            } else {
                return false;
            }
        };
    }]);