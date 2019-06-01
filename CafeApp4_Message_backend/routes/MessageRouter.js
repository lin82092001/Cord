var express=require('express');
var router=express.Router();

var MessageService=require('../lib/MessageService');

router.post('/registerToken',function(req,res,next){
	MessageService.registerToken(
		req.body['accountId'],
		req.body['deviceType'],
		req.body['deviceToken'],
		function(result){
			res.json(result);
		}
	);
});

router.post('/sendMessage',function(req,res,next){
	MessageService.sendMessage(
		req.body['accountId'],
		req.body['message'],
		function(result){
			res.json(result);
		}
	);
});

router.post('/clearBadge',function(req,res,next){
	MessageService.clearBadge(
		req.body['accountId'],
		function(result){
			res.json(result);
		}
	);
});

module.exports=router;