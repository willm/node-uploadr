var formidable = require('formidable'),
	util = require('util'),
    events = require('events'),
	uploadDirectory = './uploads',
	fs = require('fs');
    uploadHandler = new events.EventEmitter();

(function (){
	fs.mkdir(uploadDirectory);
})();

exports.uploadForm = function (req, res){
	var form = new formidable.IncomingForm(),
		files = [],
		fields = [];

	form.uploadDir = uploadDirectory;
	form.keepExtensions = true;

	function percentageComplete (total, received){
		return Math.round (received * 100 / total);
	}

	form.on('field', function(field, value) {
			console.log(field, value);
			fields.push([field, value]);
		})
		.on('progress', function(bytesReceived, bytesExpected) {
			var percentage = percentageComplete(bytesExpected, bytesReceived);
			if(percentage % 5 === 0){
				uploadHandler.emit('upload-status',{data:percentage});
			}
		})
		.on('file', function(field, file) {
			files.push([field, file]);
		})
		.on('end', function() {
			var response = {path : files[0][1].path, message : fields[0][1]};
			res.writeHead(200, {'content-type': 'application/json'});
			
			console.log(JSON.stringify(response));
			res.end(JSON.stringify(response));
		});
	form.parse(req);
};

exports.handleProgress = function (socket) {
	uploadHandler.on('upload-status', function(data){
		console.log(data);
		socket.emit('upload-progress', { sent : data.data });
	});
};
