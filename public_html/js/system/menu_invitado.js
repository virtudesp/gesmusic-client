gesmusic.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService', 'metaService',
    function ($scope, $location, serverService, sessionService, metaService) {
//        $scope.username = "invitado";
//        $scope.userpass = "invitado";
//        $scope.isActive = true;
//        $scope.isSessionActive = true;
//        $scope.meta = metaService.getMeta();
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
        $scope.meta = metaService.getMeta();
    }]);