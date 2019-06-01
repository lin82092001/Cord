angular.module('CafeApp4_Message').factory('AccountManager', function () {
	
	return{
		set:function(account){
		    localStorage.accountId = account.id;
			localStorage.accountName = account.name;
			localStorage.accountBalance = account.balance;
		},
		
		setBalance:function(balance){
		    localStorage.accountBalance = balance;
		},
		
		get:function(){
		    return{
		        id: localStorage.accountId ? parseInt(localStorage.accountId) : "",
		        name: localStorage.accountName ? localStorage.accountName : "",
		        balance: localStorage.accountBalance ? parseInt(localStorage.accountBalance) : ""
		    };
		},
		
		clear:function(){
		    localStorage.accountId = "";
		    localStorage.accountName = "";
		    localStorage.accountBalance = "";
		}
	};
});