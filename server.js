var http = require('http'),
    uploader = require('./Uploader.js'),
    Page = require('./Page.js'),
    io = require('socket.io'),
    port = 8080;

function routes(req, res) {
	switch (req.url) {
		case '/':
			console.log(req);
			Page.render('home.html', res);
		break;

		case '/upload':
			uploader.uploadForm(req, res);
		break;
	
		default:
			Page.notFound(res);
	}
}

(function (){
	var server = http.createServer(routes);
	io.listen(server)
		.sockets.on('connection', uploader.handleProgress);
	server.listen(port);
	console.log('listening on http://localhost:' + port + '/');
})();
