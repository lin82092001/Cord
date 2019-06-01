angular.module('CafeApp2_Model').factory('CouponManager',function($indexedDB,$q){
	
	var coupons={};
	
	return{
		load:function(){
		    var deferred = $q.defer();

			$indexedDB.openStore('Coupon',function(store){
				store.getAll().then(function(items){
					if(items.length===0)
					{
						deferred.resolve();
						return;
					}
					
					items.forEach(function(item){
						coupons[item.id]=item;
					});
					
					deferred.resolve();
				});
			});
			
			return deferred.promise;
		},

		add:function(coupon){
			if(!coupons[coupon.id]){
				$indexedDB.openStore('Coupon',function(store){
					store.insert(coupon);
				});
				coupons[coupon.id]=coupon;
			}
		},

		update:function(coupon){
			$indexedDB.openStore('Coupon',function(store){
					store.upsert(coupon);
				});
				coupons[coupon.id]=coupon;
		},

		list:function(){
			return coupons;
		},

		clear:function(){
			$indexedDB.openStore('Coupon',function(store){
					store.clear();
				});
				coupons={};
		}
	};
});