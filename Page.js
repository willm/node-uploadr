var fs = require('fs'),
    jade = require('jade');

	exports.render = function (file, res){
		res.writeHead(200, {'content-type': 'text/html'});
			fs.readFile(__dirname + '/' + file,
			  function (err, data) {
				if (err) {
				  res.writeHead(500);
				  return res.end('Error loading index.html');
				}
				res.end(data);
		});
	}

	exports.notFound = function (res){
		res.writeHead(404, {'content-type': 'text/plain'});
		res.end('404: This is not the page you were looking for');
	}
