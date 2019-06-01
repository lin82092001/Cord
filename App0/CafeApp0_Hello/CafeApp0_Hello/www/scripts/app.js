(function () {

    var app = angular.module('CafeApp0_Hello', ['ionic']);

    app.run(function ($state, $ionicPlatform) {

        $ionicPlatform.ready(function () {
            $state.go('hello');
        });

    });

    app.config(function ($stateProvider) {
        $stateProvider
            .state('hello', {
                url: "/hello",
                templateUrl: "views/hello.html",
                controller: "helloController",
                controllerAs: "helloCtrl"
            });
    });

})();