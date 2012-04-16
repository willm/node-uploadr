(function  (){
	var express = require('express'),
		path = require('path');
	
	server = express.createServer();
	
	server.configure(function configureAppAndMiddleware() {
		server.set('view engine', 'jade');
		server.set('view', path.join(__dirname,'views'));
	});
	
	server.get('/', function  (req, res){
		res.render("index", {layout : false});
	});
	
	server.listen(8080);
	console.log("server listening on port 8080");
})()
