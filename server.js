(function  (){
	var express = require('express'),
		path = require('path');
	
	server = express.createServer();
	
	server.configure(function configureAppAndMiddleware() {
		server.set('view engine', 'jade');
		server.use(express.bodyParser());
	});
	
	server.get('/', function  (req, res){
		res.render("index", {layout : false});
	});
	
	server.post('/upload', function (req, res){
		
		console.log(req.body);
		res.send(200);
	});
	
	server.listen(8080);
	console.log("server listening on port 8080");
})()
