(function () {

    var app = angular.module('CafeApp4_Message', ['ionic','indexedDB','angular.filter']);

    app.run(function ($state, $ionicPlatform,$rootScope,LoadManager,ProductManager,CafeProxy,MessageCordova) 
	{

        $ionicPlatform.ready(function () {
            
			LoadManager.ready().then(function(){
				$state.go('tab.store');
				
				CafeProxy.getProducts(function(products){
					products.forEach(function(product){
						ProductManager.add(product);
					});
					$rootScope.$broadcast('ctrl:store:updateSlide');
				});
			});
			MessageCordova.initialization();
        });

    });

    app.config(function ($stateProvider,$ionicConfigProvider,$indexedDBProvider) {
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "views/tab.html"
            })
			.state('tab.coupon', {
			    url: "/coupon",
			    views: {
			        'couponTab': {
			            templateUrl: "views/coupon.html",
			            controller: "couponController",
			            controllerAs: "couponCtrl"
			        }
			    }
			})
			.state('tab.store', {
			    url: "/store",
			    views: {
			        'storeTab': {
			            templateUrl: "views/store.html",
			            controller: "storeController",
			            controllerAs: "storeCtrl"
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
			.state('tab.account', {
			    url: "/account",
			    views: {
			        'accountTab': {
			            templateUrl: "views/account.html",
			            controller: "accountController",
			            controllerAs: "accountCtrl"
			        }
			    }
			});

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');

        $indexedDBProvider
            .connection('CafeApp4_Message_indexedDB')
            .upgradeDatabase(1, function (event, db, tx) {
                db.createObjectStore('Product', { keyPath: 'id' });
                db.createObjectStore('Transaction', { keyPath: 'id' });
                db.createObjectStore('Coupon', { keyPath: 'id' });
            });
    });

})();