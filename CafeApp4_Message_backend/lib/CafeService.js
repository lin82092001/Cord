var mongoose=require('mongoose');
var Q=require('q');
var moment=require('moment');

var AccountDao=mongoose.model('AccountDao');
var TransactionDao=mongoose.model('TransactionDao');
var ProductDao=mongoose.model('ProductDao');
var CouponDao=mongoose.model('CouponDao');

var MessageService=require('./MessageService');

function loginAccount(name,callback){
	AccountDao.findOne({name:name}).exec()
	.then(function(account){
		if(account){
			return{
				id:account._id,
				name:account.name,
				balance:account.balance
			};
		}else{
			return AccountDao.create({
				name:name,
				balance:0
			})
			.then(function(newAccount){
				return{
					id:newAccount._id,
					name:newAccount.name,
					balance:newAccount.balance
				};
			});
		}
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function addTransaction(accountId,amount,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		account.balance+=amount;
		return account.save().then(function(){
			return account;
		});
	})
	.then(function(account){
		return TransactionDao.create({
			accountId:account._id,
			oldBalance:account.balance-amount,
			amount:amount,
			balance:account.balance
		})
		.then(function(transaction){
			return{
				id:transaction._id,
				name:account.name,
				oldBalance:transaction.oldBalance,
				depositAmount:(amount>=0)?amount:null,
				withdrawAmount:(amount<0)?-amount:null,
				balance:transaction.balance,
				timeStamp:moment(transaction.timeStamp).format('YYYY/MM/DD HH:mm:ss')
			};
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function getTransactions(accountId,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		return TransactionDao.find({accountId:accountId}).exec()
		.then(function(transactions){
			var resTransactions = [];
			
			transactions.forEach(function(transaction){
				resTransactions.push({
					id:transaction._id,
					name:account.name,
					oldBalance:transaction.oldBalance,
					depositAmount:(transaction.amount>=0)?transaction.amount:null,
					withdrawAmount:(transaction.amount<0)?-transaction.amount:null,
					balance:transaction.balance,
					timeStamp:moment(transaction.timeStamp).format('YYYY/MM/DD HH:mm:ss')
				});
			});
			
			return resTransactions;
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function getProducts(callback){
	ProductDao.find().exec()
	.then(function(products){
		var resProducts=[];
			
		products.forEach(function(product){
			resProducts.push({
				id:product._id,
				name:product.name,
				price:product.price
			});
		});
			
		return resProducts;
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function buyCoupon(accountId,productId,callback){
	AccountDao.findOne({_id:accountId}).exec()
	.then(function(account){
		if(!account){
			throw new Error("Account not exist");
		}
		
		return ProductDao.findOne({_id:productId}).exec()
		.then(function(product){
			if(!account){
				throw new Error("Product not exist");
			}
			
			return [account,product];
		});
	})
	.then(function(arr){
		var account=arr[0],product=arr[1];
		
		if(account.balance<product.price){
			throw new Error("餘額不足，請加值");
		}
		
		if(account.balance-product.price<100){
			MessageService.sendMessage(account._id,"餘額過低，請加值",function(){});
		}
		
		return arr;
	})
	.then(function(arr){
		var account=arr[0],product=arr[1];
		
		return CouponDao.create({
			productId:product._id,
			accountId:account._id
		})
		.then(function(coupon){
			var deferred=Q.defer();
			
			addTransaction(account._id,-product.price,function(result){
				if(typeof result==="string"){
					throw new Error(result);
				}
				
				deferred.resolve({
					coupon:{
						id:coupon._id,
						name:product.name,
						price:product.price,
						buyStamp:moment(coupon.buyStamp).format('YYYY/MM/DD HH:mm:ss'),
						redeemStamp:null
					},
					transaction:result
				});
			});
			
			return deferred.promise;
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback({
			error:err.message
		});
	});
}

function redeemCoupon(couponId,callback){
	CouponDao.findOne({_id:couponId}).exec()
	.then(function(coupon){
		if(!coupon){
			throw new Error("Coupon not exist");
		}
		
		return ProductDao.findOne({_id:coupon.productId}).exec()
		.then(function(product){
			if(!product){
				throw new Error("Product not exist");
			}
			
			return [coupon,product];
		});
	})
	.then(function(arr){
		var coupon=arr[0],product=arr[1];
		
		if(coupon.redeemStamp){
			throw new Error("此票券已使用過");
		}
		coupon.redeemStamp=Date.now();
		
		return coupon.save().then(function(){
			return{
				id:coupon._id,
				name:product.name,
				price:product.price,
				buyStamp:moment(coupon.buyStamp).format('YYYY/MM/DD HH:mm:ss'),
				redeemStamp:moment(coupon.redeemStamp).format('YYYY/MM/DD HH:mm:ss')
			};
		});
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

function getCoupons(accountId,callback){
	CouponDao.find({accountId:accountId}).exec()
	.then(function(coupons){
		var promises=[];
		
		coupons.forEach(function(coupon){
			var deferred=Q.defer();
			ProductDao.findOne({_id:coupon.productId}).exec()
			.then(function(product){
				deferred.resolve({
					id:coupon._id,
					name:product.name,
					price:product.price,
					buyStamp:moment(coupon.buyStamp).format('YYYY/MM/DD HH:mm:ss'),
					redeemStamp:(coupon.redeemStamp)?moment(coupon.redeemStamp).format('YYYY/MM/DD HH:mm:ss'):null
				});
			})
			
			promises.push(deferred.promise);
		});
		
		return Q.all(promises);
	})
	.then(function(result){
		callback(result);
	})
	.then(undefined,function(err){
		callback(err.message);
	});
}

module.exports={
	loginAccount:loginAccount,
	addTransaction:addTransaction,
	getTransactions:getTransactions,
	getProducts:getProducts,
	buyCoupon:buyCoupon,
	redeemCoupon:redeemCoupon,
	getCoupons:getCoupons
};