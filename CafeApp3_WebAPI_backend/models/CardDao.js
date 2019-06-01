var mongoose=require('mongoose');
var autoIncrement=require("mongoose-auto-increment");

var Account=require('./Account');
var Transaction=require('./Transaction');
var Product=require('./Product');
var Card=require('./Card');

var connection=mongoose.connect('mongodb://Apps12:a1234@apps.csie.ntut.edu.tw:27017/Apps12');

autoIncrement.initialize(connection);

Account.plugin(autoIncrement.plugin,'Account');
Transaction.plugin(autoIncrement.plugin,'Transaction');
Product.plugin(autoIncrement.plugin,'Product');
Card.plugin(autoIncrement.plugin,'Card');

mongoose.model('AccountDao',Account);
mongoose.model('TransactionDao',Transaction);
mongoose.model('ProductDao',Product);
mongoose.model('CardDao',Card);

var ProductDao=mongoose.model('ProductDao');

var products=[
	{
		name:"GASH",
		count:3000
	},
	{
		name:"myCard",
		count:2
	},
	{
		name:"WGS",
		count:1000
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