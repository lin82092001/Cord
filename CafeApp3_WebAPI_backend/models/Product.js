var mongoose=require('mongoose');

var Product=new mongoose.Schema(
	{
		name:String,
		count:Number
	},
	{
		collection:'Product'
	}
);

module.exports=Product;