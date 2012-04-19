TEST_PORT = 8080;

var server = require('http').createServer(routes),
    uploader = require('./Uploader.js'),
    Page = require('./Page.js'),
    io = require('socket.io').listen(server),
    fs = require('fs');

function routes(req, res) {
  switch(req.url){
  	case '/':
	  	fs.readFile(__dirname + '/home.html',
		  function (err, data) {
			if (err) {
			  res.writeHead(500);
			  return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		  });

	break;
	
	case '/upload':
		uploader.uploadForm(req, res);
	break;
	
	default:
    	Page.notFound(res);
  }
}

server.listen(TEST_PORT);

console.log('listening on http://localhost:'+TEST_PORT+'/');

(function (){
	var fakePercent = 0;
	io.sockets.on('connection', function (socket) {
		
		socket.on('begin-upload', function (data) {
			console.log(data);
			setInterval(function(){
				socket.emit('upload-progress', { sent : fakePercent +'%' });
				fakePercent ++;
				},2000);
		});
	});
})();
