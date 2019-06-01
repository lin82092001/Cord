angular.module('CafeApp2_Model').factory('LoadManager',function($q,ProductManager,TransactionManager,CouponMAnager){
	
	var deferred=$q.defer();
	
	var promises=[
		ProductManager.load(),
		TransactionManager.load(),
		CouponMAnager.load()
	];
	
	$q.all(promises).then(function(){
		deferred.resolve();
	});
	
	return{
		ready:function(){
			return deferred.promises;
		}
	};
});