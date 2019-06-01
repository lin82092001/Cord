var mongoose=require('mongoose');

var Card=new mongoose.Schema(
	{
		productId:Number,
		accountId:Number,
		card:Number,
		buyStamp:{type:Date,default:Date.now}
	},
	{
		collection:'Card'
	}
);

module.exports=Card;