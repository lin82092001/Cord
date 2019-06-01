var mongoose=require('mongoose');
var autoIncrement=require("mongoose-auto-increment");

var Account=require('./Account');
var Transaction=require('./Transaction');
var Product=require('./Product');
var Coupon=require('./Coupon');

var connection=mongoose.connect('mongodb://Apps12:a1234@apps.csie.ntut.edu.tw:27017/Apps12');

autoIncrement.initialize(connection);

Account.plugin(autoIncrement.plugin,'Account');
Transaction.plugin(autoIncrement.plugin,'Transaction');
Product.plugin(autoIncrement.plugin,'Product');
Coupon.plugin(autoIncrement.plugin,'Coupon');

mongoose.model('AccountDao',Account);
mongoose.model('TransactionDao',Transaction);
mongoose.model('ProductDao',Product);
mongoose.model('CouponDao',Coupon);

var ProductDao=mongoose.model('ProductDao');

var products=[
	{
		name:"Starbucks",
		price:300
	},
	{
		name:"BrownCafe",
		price:200
	},
	{
		name:"CityCafe",
		price:100
	}
];

products.forEach(function(product){
	ProductDao.findOne({name:product.name},function(err,item){
		if(err){
			console.log(err);
			return;
		}
		
		if(!item){
			ProductDao.create(product,function(err,product){
				if(err){
					console.log(err);
					return;
				}
			});
		}
	});
});