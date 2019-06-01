angular.module('CafeApp2_Model').factory('CafeProxy',function(){
	
	return{
		loginAccount:function(name,onSuccess){
			var account={
				id:1,
				name:"Alice",
				balance:0
			};
			onSuccess(account);
		},
		
		addTransaction:function(accountId,amount,onSuccess){
			var transaction={
				id:2,
				name:"Alice",
				oldBalance:0,
				depositAmount:500,
				withdrawAccount:null,
				balance:500,
				timeStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
			};
			onSuccess(transaction)
		},
		
		getTransaction:function(accountId,onSuccess){
			var transactions=[{
				id:3,
				name:"Alice",
				oldBalance:500,
				depositAmount:300,
				withdrawAccount:null,
				balance:800,
				timeStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
			},
			{
				id:4,
				name:"Alice",
				oldBalance:800,
				depositAmount:null,
				withdrawAccount:300,
				balance:500,
				timeStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
			}
			];
			onSuccess(transactions)
		},
		
		gerProduct:function(onSuccess){
			var products=[
			{
				id:1,
				name:"Starbucks",
				price:300
			},
			{
				id:2,
				name:"BrownCafe",
				price:200
			},
			{
				id:3,
				name:"CityCafe",
				price:100
			}
			];
			onSuccess(products)
		},
		
		buyCoupon:function(accountId,productId,onSuccess){
			var buyData={
				coupon:{
					id:6,
					name:"Starbucks",
					price:300,
					buyStamp:moment().format('YYY/MMM/DDD HH:mm:ss'),
					redeemStamp:null
				},
				transaction:{
					id:7,
					name:"Alice",
					oldBalance:500,
					depositAmount:null,
					withdrawAccount:300,
					balance:200,
					timeStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
				},
				error:null
			};
			onSuccess(buyData);
		},
		
		redeemCoupon:function(couponId,onSuccess){
			var coupon={
				id:8,
				name:"Starbucks",
				price:300,
				buyStamp:moment().format('YYY/MMM/DDD HH:mm:ss'),
				redeemStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
			};
			onSuccess(coupon);
		},
		
		getCoupon:function(accountId,onSuccess){
			var coupons=[
			{
				id:9,
				name:"Starbucks",
				price:300,
				buyStamp:moment().format('YYY/MMM/DDD HH:mm:ss'),
				redeemStamp:null
			},
			{
				id:10,
				name:"Starbucks",
				price:300,
				buyStamp:moment().format('YYY/MMM/DDD HH:mm:ss'),
				redeemStamp:moment().format('YYY/MMM/DDD HH:mm:ss')
			}
			];
			onSuccess(coupons);
		}
	};
});