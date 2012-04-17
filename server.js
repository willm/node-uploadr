/*(function  (){
	var express = require('express'),
		formidable = require('formidable');
	
	server = express.createServer();
	
	server.configure(function() {
		server.set('view engine', 'jade');
		server.use(express.bodyParser({uploadDir:'./uploads'}));
		var form = new formidable.IncomingForm();
		form.onPart = function(part) {
		  part.addListener('data', function() {
			console.log('boo');
		  });
		}
	});
	
	server.get('/', function  (req, res){
		res.render("index", {layout : false});
	});
	
	server.post('/upload', function (req, res){
		console.log("req");
	});
	
	server.listen(8080);
	console.log("server listening on port 8080");
})()*/
TEST_PORT = 8080;
TEST_TMP = './uploads'
var http = require('http'),
    util = require('util'),
    formidable = require('formidable'),
    server;

server = http.createServer(function(req, res) {
  if (req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  } else if (req.url == '/upload') {
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.uploadDir = TEST_TMP;

	form.onPart = function(part) {
	  part.addListener('data', function() {
		console.log(percentageComplete(form.bytesExpected,form.bytesReceived));
		form.handlePart(part);
	  });
	}
	
	function percentageComplete (total, received){
		return percent = received * 100 / total;
	}

    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file.size);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('-> upload done');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received fields:\n\n '+util.inspect(fields));
        res.write('\n\n');
        res.end('received files:\n\n '+util.inspect(files));
      });
    form.parse(req);
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(TEST_PORT);

console.log('listening on http://localhost:'+TEST_PORT+'/');
