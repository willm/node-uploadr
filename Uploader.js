var formidable = require('formidable'),
	util = require('util'),
	uploadDirectory = './uploads';

exports.uploadForm = function (req, res, event){
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
				event.emit('upload-status',{data:percentage});
			}
		})
		.on('file', function(field, file) {
			files.push([field, file]);
		})
		.on('end', function() {
			res.writeHead(200, {'content-type': 'text/plain'});
			console.log(files[0][1].path);
			res.end(files[0][1].path);
		});
	form.parse(req);
};
