TEST_PORT = 8080;

var server = require('http').createServer(routes),
    uploader = require('./Uploader.js'),
    Page = require('./Page.js'),
    io = require('socket.io').listen(server).sockets.on('connection',handleUpload),
    events = require('events'),
    uploadHandler = new events.EventEmitter();

function routes(req, res) {
  switch(req.url){
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

server.listen(TEST_PORT);
console.log('listening on http://localhost:'+TEST_PORT+'/');
