var express=require('express');
var router=express.Router();

var CardService=require('../lib/CardService');

router.post('/loginAccount',function(req,res,next){
	CardService.loginAccount(
		req.body['name'],
		req.body['pswd'],
		function(result){
			res.json(result);
		}
	);
});

router.post('/addTransaction',function(req,res,next){
	CardService.addTransaction(
		req.body['accountId'],
		req.body['amount'],
		function(result){
			res.json(result);
		}
	);
});

router.get('/getTransactions',function(req,res,next){
	CardService.getTransactions(
		req.query['accountId'],
		function(result){
			res.json(result);
		}
	);
});

router.get('/getProducts',function(req,res,next){
	CardService.getProducts(
		function(result){
			res.json(result);
		}
	);
});

router.post('/buyCard',function(req,res,next){
	CardService.buyCard(
		req.body['accountId'],
		req.body['productId'],
		req.body['card'],
		function(result){
			res.json(result);
		}
	);
});

/*router.post('/redeemCoupon',function(req,res,next){
	CardService.redeemCoupon(
		req.body['couponId'],
		function(result){
			res.json(result);
		}
	);
});*/

router.get('/getCards',function(req,res,next){
	CardService.getCards(
		req.query['accountId'],
		function(result){
			res.json(result);
		}
	);
});

module.exports=router;