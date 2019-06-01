angular.module('CafeApp2_Model').factory('AccountManager',function(){
	
	return{
		set:function(account){
			localStoreage.accountId=accountid;
			localStoreage.accountName=account.name;
			localStoreage.accountBalance=account.balance;
		},
		
		setBalance:function(balance){
			localStoreage.accountBalance=balance;
		},
		
		get:function(){
			return{
				id:localStoreage.accountId ? parseInt(localStoreage.accountId):",
				name:localStoreage.accountName ? localName.accountName:",
				balance:localStoreage.accountBalance ? parseInt(localStoreage.accountBalance):"
			};
		},
		
		clear:function(){
			localStoreage.accountId=";
			localStoreage.accountName=";
			localStoreage.accountBalance=";
		}
	};
});