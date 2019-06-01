var mongoose=require('mongoose');

var Account=new mongoose.Schema(
	{
		name:String,
		pswd:String,
		balance:Number,
		card:Number
	},
	{
		collection:'Account'
	}
);

module.exports=Account;