var mongoose=require('mongoose');

var Coupon=new mongoose.Schema(
	{
		productId:Number,
		accountId:Number,
		buyStamp:{type:Date,default:Date.now},
		redeemStamp:{type:Date,default:null}
	},
	{
		collection:'Coupon'
	}
);

module.exports=Coupon;