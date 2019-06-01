angular.module('CafeApp2_Model').factory('ProductManager',function($indexedDB,$q){
	
	var products={};
	
	return{
		load:function(){
			var deferred=$q.defer();
			$indexedDB.openStroe('Product',function(stroe){
				store.getALL().then(function(items){
					if(items.length===0)
					{
						deferred.resolve();
						return;
					}
					
					items.forEach(function(item){
						products[item.id]=item;
					});
					
					deferred.resolve();
				});
			});
			
			return deferred.promise;
		},
		add:function(product){
			if(!products[product.id]){
				$indexedDB.openStore('Product',function(store){
					store.insert(product);
				});
				products[product.id]=product;
			}
		},
		list:function(){
			return products;
		},
		clear:function(){
			$indexedDB.openStore('Product',function(store){
					store.clear();
				});
			products={};
		}
	};
});