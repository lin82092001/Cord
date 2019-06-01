var mongoose=require('mongoose');
var Client = require('node-rest-client').Client;
var Q=require('q');

var AccountDao=mongoose.model('AccountDao');

var pushApiUrl="http://apps.csie.ntut.edu.tw:8000/";

function registerToken(accountId,deviceType,deviceToken,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		account.badge=0;
		return account.save().then(function(){
			var client=new Client();
			
			var user="12_"+account._id;
			
			var args={
				headers:{
					"Content-Type":"application/json"
				},
				data:{
					user:user,
					type:deviceType,
					token:deviceToken
				}
			};
			
			var deferred=Q.defer();
			
			client.post(pushApiUrl+"subscribe",args,function(data,response){
				if(response.statusCode<200 || response.statusCode>299){
					deferred.reject("Push Server Error -"+response.statusMessage);
				}else{
					deferred.resolve();
				}
			});
			return deferred.promise;
		});
	})
	.then(function(){
		return null;
	},function(err){
		throw new Error(err);
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function sendMessage(accountId,message,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		account.badge++;
		return account.save().then(function(){
			var client=new Client();
			
			var user="12_"+account._id;
			
			var args={
				headers:{
					"Content-Type":"application/json"
				},
				data:{
					users:[user],
					android:{
						data:{
							title:"CafeApp4_Message",
							body:message,
							badge:account.badge
						}
					},
					ios:{
						alert:message,
						badge:account.badge
					}
				}
			};
			
			client.post(pushApiUrl+"send",args,function(data,response){});
			
			setTimeout(function(){
				client.post(pushApiUrl+"send",args,function(data,response){});
			},30000);
			
			return null;
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function clearBadge(accountId,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		account.badge=0;
		return account.save().then(function(){		
			return null;
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

module.exports={
	registerToken:registerToken,
	sendMessage:sendMessage,
	clearBadge:clearBadge
};