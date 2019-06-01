(function () {

    var app = angular.module('CafeApp2_Model', ['ionic','indexDB','angular.filter']);

    app.run(function ($state, $ionicPlatform,$rootScope,LoadManager,ProductManager,CafeProxy) {

        $ionicPlatform.ready(function () {
            
			LoadManager.ready().then(function(){
				$state.go('tab.store');
				
				CafeProxy.getProduct(function(products){
					products.forEach(function(product){
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
                abstract:true,
				templateUrl:"views/tab.html"
            })
			.state('tab.coupon',{
				url:"/coupon",
				views:{
					'couponTab':{
						templateUrl: "views/coupon.html",
						controller: "couponController",
						controllerAs: "couponCtrl"
					}
				}
			})
			.state('tab.store',{
				url:"/store",
				views:{
					'storeTab':{
						templateUrl: "views/store.html",
						controller: "storeController",
						controllerAs: "storeCtrl"
					}
				}
			})
			.state('tab.card',{
				url:"/card",
				views:{
					'cardTab':{
						templateUrl: "views/card.html",
						controller: "cardController",
						controllerAs: "cardCtrl"
					}
				}
			})
			.state('tab.account',{
				url:"/account",
				views:{
					'accountTab':{
						templateUrl: "views/account.html",
						controller: "accountController",
						controllerAs: "accountCtrl"
					}
				}
			})
    });
	
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.navBar.alignTitle('center');
	
	$indexDBProvider
		.connection('CafeApp2_Model_indexDB')
		.upgradeDatabase(1,function(event,db,tx){
			db.createObjectStore('Product',{keyPath:'id'});
			db.createObjectStore('Transaction',{keyPath:'id'});
			db.createObjectStore('Coupon',{keyPath:'id'});
		});

})();