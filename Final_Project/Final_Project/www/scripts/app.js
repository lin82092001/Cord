(function () {
    var app = angular.module('Final_Project', ['ionic', 'indexedDB', 'angular.filter']);

    app.run(function ($state, $ionicPlatform ,$rootScope, LoadManager, ProductManager, CardProxy) {
        $ionicPlatform.ready(function () {

            LoadManager.ready().then(function () {
                $state.go('tab.account');

                CardProxy.getProducts(function (products) {
                    products.forEach(function (product) {
                        ProductManager.add(product);
                    });
                    $rootScope.$broadcast('ctrl:store:updateSlide');
                });
            });
            
        });
    });

    app.config(function ($stateProvider,$ionicConfigProvider,$indexedDBProvider) {
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "views/tab.html"
            })
            .state('tab.account', {
                url: "/account",
                views: {
                    'accountTab': {
                        templateUrl: "views/account.html",
                        controller: "accountController",
                        controllerAs: "accountCtrl"
                    }
                }
            })
            .state('tab.bonus', {
                url: "/bonus",
                views: {
                    'bonusTab': {
                        templateUrl: "views/bonus.html",
                        controller: "bonusController",
                        controllerAs: "bonusCtrl"
                    }
                }
            })
            .state('tab.company', {
                url: "/company",
                views: {
                    'companyTab': {
                        templateUrl: "views/company.html",
                        controller: "companyController",
                        controllerAs: "companyCtrl"
                    }
                }
            })
            .state('tab.card', {
                url: "/card",
                views: {
                    'cardTab': {
                        templateUrl: "views/card.html",
                        controller: "cardController",
                        controllerAs: "cardCtrl"
                    }
                }
            })
            .state('tab.buy', {
                url: "/buy",
                views: {
                    'buyTab': {
                        templateUrl: "views/buy.html",
                        controller: "buyController",
                        controllerAs: "buyCtrl"
                    }
                }
            });

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');

        $indexedDBProvider
            .connection('Final_Project_indexedDB')
            .upgradeDatabase(1, function (event, db, tx) {
                db.createObjectStore('Transaction', { keyPath: 'id' });
                db.createObjectStore('Card', { keyPath: 'id' });
                db.createObjectStore('Product', { keyPath: 'id' });

            });
    });

})();