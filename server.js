TEST_PORT = 8080;

var server = require('http').createServer(routes),
    uploader = require('./Uploader.js'),
    Page = require('./Page.js'),
    io = require('socket.io').listen(server),
    events = require('events');
    
var uploadHandler = new events.EventEmitter();

function routes(req, res) {
  switch(req.url){
  	case '/':
	  	Page.render('home.html');
	break;

	case '/upload':
		uploader.uploadForm(req, res, uploadHandler);
	break;
	
	default:
    	Page.notFound(res);
  }
}

server.listen(TEST_PORT);

console.log('listening on http://localhost:'+TEST_PORT+'/');

(function (eventHandler){
	var fakePercent = 0;
	io.sockets.on('connection', function (socket) {
		eventHandler.on('upload-status', function(data){
			console.log(data);
				socket.emit('upload-progress', { sent : data.data });
		});
	});
})(uploadHandler);
