require('./models/CafeDao');

var express=require('express');

var app=express();
var router=express.Router();

var CafeRouter=require('./routes/CafeRouter');
var MessageRouter=require('./routes/MessageRouter');

var bodyParser=require('body-parser');

var logger=require('morgan');

app.use(logger('dev'));

app.use(function(req,res,next){

	res.setHeader('Access-Control-Allow-Origin','*');
	
	res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
	
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
	
	res.setHeader('Access-Control-Allow-Credentials',true);
	
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var virtualDirPath=process.env.virtualDirPath || '';

app.use(virtualDirPath,router);

router.use('/CafeApi',CafeRouter);
router.use('/MessageApi',MessageRouter);

app.use(function(req,res,next){
	var err=new Error('Not Found');
	err.status=404;
	next(err);
});

if(app.get('env')==='development'){
	app.use(function(err,req,res,next){
		res.status(err.status || 500);
		res.send(err.stack);
	});
}

app.use(function(err,req,res,next){
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports=app;