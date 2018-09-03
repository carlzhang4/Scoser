var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());


var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

// app.use(require('cookie-parser')(credentials.cookieSecret));
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3333);
//***************************************************temp
var item=[{name:'cj1',price:100,description:"good"},{name:'cj2',price:1000,description:"good"},{name:'cj3',price:100,description:"good"}];

//***************************************************方法路由
var dbcontrol = require('./control/dbcontrol');
app.get('/register',dbcontrol.register);
app.get('/login',dbcontrol.login);
app.get('/publish',dbcontrol.publish);
app.get('/upload',dbcontrol.upload);
app.get('/market',dbcontrol.market);
app.get('/storage',dbcontrol.storage);
app.get('/details',dbcontrol.details);
app.get('/storage_det',dbcontrol.storage_det);
app.get('/security_check',dbcontrol.security_check);
//***************************************************文件路由
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	console.log(process.env);
	res.render('login',{layout:null,user_id:null,state:null});
});

app.get('/index',function(req,res){
	//console.log(req.cookies.name);
	res.render('index')
});

app.get('/intro',function(req,res){
	//console.log(req.cookies.name);
	res.render('intro')
});

app.get('/editor.html',function(req,res){
	res.render('editor',{state:null});
})

app.get('/login.html',function(req,res){
	res.render('login',{layout:null,user_id:null,state:null});
})

app.get('/register.html',function(req,res){
	res.render('register',{layout:null,user_id:null,state:null});
})
//***************************************************文件路由
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+';press ctrl-C to terminate!');
});