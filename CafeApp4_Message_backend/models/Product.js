var mongoose=require('mongoose');

var Product=new mongoose.Schema(
	{
		name:String,
		price:Number
	},
	{
		collection:'Product'
	}
);

module.exports=Product;