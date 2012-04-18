var fs = require('fs'),
    jade = require('jade');

	exports.render = function (file, response){
		response.writeHead(200, {'content-type': 'text/html'});
			fs.readFile('./views/'+file,'utf8',function (err, data){
				response.end(jade.compile(data)());
			});
	}

	exports.notFound = function (res){
		res.writeHead(404, {'content-type': 'text/plain'});
		res.end('404: This is not the page you were looking for');
	}
