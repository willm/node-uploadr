

TEST_PORT = 8080;
TEST_TMP = './uploads';

var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    jade = require('jade'),
    formidable = require('formidable'),
    server;

server = http.createServer(function(req, res) {
  switch(req.url){
  	case '/':
		new Page().render('index.jade', res);
	break;
	case '/upload':
		var form = new formidable.IncomingForm(),
		    files = [],
		    fields = [];

		form.uploadDir = TEST_TMP;
	
		function percentageComplete (total, received){
			return Math.round(received * 100 / total);
		}

		form
		  .on('field', function(field, value) {
		    console.log(field, value);
		    fields.push([field, value]);
		  })
		  .on('progress', function(bytesReceived, bytesExpected) {
		    console.log(percentageComplete(bytesExpected,bytesReceived))
		  })
		  .on('file', function(field, file) {
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
	break;
	default:
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});

function Page (){};
Page.prototype.render = function (file, response){
	response.writeHead(200, {'content-type': 'text/html'});
		fs.readFile('./views/'+file,'utf8',function (err, data){
			response.end(jade.compile(data)());
		});
}
server.listen(TEST_PORT);

console.log('listening on http://localhost:'+TEST_PORT+'/');
