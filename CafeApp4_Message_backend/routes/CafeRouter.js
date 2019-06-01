var express=require('express');
var router=express.Router();

var CafeService=require('../lib/CafeService');

router.post('/loginAccount',function(req,res,next){
	CafeService.loginAccount(
		req.body['name'],
		function(result){
			res.json(result);
		}
	);
});

router.post('/addTransaction',function(req,res,next){
	CafeService.addTransaction(
		req.body['accountId'],
		req.body['amount'],
		function(result){
			res.json(result);
		}
	);
});

router.get('/getTransactions',function(req,res,next){
	CafeService.getTransactions(
		req.query['accountId'],
		function(result){
			res.json(result);
		}
	);
});

router.get('/getProducts',function(req,res,next){
	CafeService.getProducts(
		function(result){
			res.json(result);
		}
	);
});

router.post('/buyCoupon',function(req,res,next){
	CafeService.buyCoupon(
		req.body['accountId'],
		req.body['productId'],
		function(result){
			res.json(result);
		}
	);
});

router.post('/redeemCoupon',function(req,res,next){
	CafeService.redeemCoupon(
		req.body['couponId'],
		function(result){
			res.json(result);
		}
	);
});

router.get('/getCoupons',function(req,res,next){
	CafeService.getCoupons(
		req.query['accountId'],
		function(result){
			res.json(result);
		}
	);
});

module.exports=router;