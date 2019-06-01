angular.module('CafeApp4_Message').factory('MessageProxy',function($http){
	
    var apiUrl = 'http://apps.csie.ntut.edu.tw/apps00/MessageApi/';    //CafeApp2_WebAPI

	return{
	    registerToken: function (accountId,deviceType,deviceToken, onSuccess) {
			var parameter={
				accountId:accountId,
				deviceType:deviceType,
				deviceToken:deviceToken
			};
			
			$http.post(apiUrl + 'registerToken', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    (onSuccess || angular.noop)(data);
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
		
	    clearBadge: function (accountId, onSuccess) {
	        var parameter = {
	            accountId: accountId
	        };

	        $http.post(apiUrl + 'clearBadge', parameter, { responseType: 'json' }).
                success(function (data, status, headers, config) {
                    (onSuccess || angular.noop)(data);
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