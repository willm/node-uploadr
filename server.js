var http = require('http'),
    uploader = require('./Uploader.js'),
    Page = require('./Page.js'),
    io = require('socket.io'),
    events = require('events'),
    uploadHandler = new events.EventEmitter(),
    port = 8080;

function routes(req, res) {
	switch (req.url) {
		case '/':
			Page.render('home.html', res);
		break;

		case '/upload':
			uploader.uploadForm(req, res, uploadHandler);
		break;
	
		default:
			Page.notFound(res);
	}
}

function handleUpload(socket) {
	uploadHandler.on('upload-status', function(data){
		console.log(data);
		socket.emit('upload-progress', { sent : data.data });
	});
}

(function (){
	var server = http.createServer(routes);
	io.listen(server)
		.sockets.on('connection', handleUpload);
	server.listen(port);
	console.log('listening on http://localhost:' + port + '/');
})();

