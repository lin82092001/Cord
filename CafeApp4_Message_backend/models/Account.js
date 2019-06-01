var mongoose=require('mongoose');

var Account=new mongoose.Schema(
	{
		name:String,
		balance:Number,
		badge:Number
	},
	{
		collection:'Account'
	}
);

module.exports=Account;