angular.module('CafeApp2_Model').factory('LoadManager',function($q,ProductManager,TransactionManager,CouponManager){
	
	var deferred=$q.defer();
	
	var promises=[
		ProductManager.load(),
		TransactionManager.load(),
		CouponManager.load()
	];
	
	$q.all(promises).then(function(){
		deferred.resolve();
	});
	
	return{
		ready:function(){
			return deferred.promise;
		}
	};
});