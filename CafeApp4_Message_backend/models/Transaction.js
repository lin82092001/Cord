var mongoose=require('mongoose');

var Transaction=new mongoose.Schema(
	{
		accountId:Number,
		oldBalance:Number,
		amount:Number,
		balance:Number,
		timeStamp:{type:Date,default:Date.now}
	},
	{
		collection:'Transaction'
	}
);

module.exports=Transaction;