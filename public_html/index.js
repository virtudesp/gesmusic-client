gesmusic.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService', 'metaService',
    function ($scope, $location, serverService, sessionService, metaService) {
//        if ($scope.username = "invitado") {
//            $scope.isActive = true;
//            $scope.isSessionActive = true;
//        } else {
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
//        }
        $scope.meta = metaService.getMeta();
    }]);