angular.module('CafeApp4_Message').factory('CafeProxy', function ($http) {
	
    var apiUrl = 'http://apps.csie.ntut.edu.tw/apps12/CafeApi/';    //CafeApp2_WebAPI

	return{
	    loginAccount: function (name, onSuccess) {
			var parameter={
				name:name
			};
			
			$http.post(apiUrl + 'loginAccount', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    addTransaction: function (accountId, amount, onSuccess) {
			var parameter={
			    accountId: accountId,
			    amount: amount
			};
			
	        $http.post(apiUrl + 'addTransaction', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    getTransactions: function (accountId, onSuccess) {
	        var parameter = '?accountId' + accountId;
			
	        $http.get(apiUrl + 'getTransactions', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    getProducts: function (onSuccess) {
	        $http.get(apiUrl + 'getProducts', { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    buyCoupon: function (accountId, productId, onSuccess) {
	        var parameter = {
	            accountId: accountId,
	            productId: productId
	        };

	        $http.post(apiUrl + 'buyCoupon', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    redeemCoupon: function (couponId, onSuccess) {
	        var parameter = {
	            couponId: couponId
	        };

	        $http.post(apiUrl + 'redeemCoupon', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		},
		
	    getCoupons: function (accountId, onSuccess) {
	        var parameter = '?accountId' + accountId;

	        $http.get(apiUrl + 'getCoupons', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    onSuccess(data);
                }).
                error(function (data, status, headers, config) {
                    if (status === -1) {
                        alert('error:Your Internet do not work!');
                    }
                    else if (status === 404) {
                        alert('error:Server not response!');
                    };
                });
		}
	};
});