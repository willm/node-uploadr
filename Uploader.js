TEST_TMP = './uploads';
var formidable = require('formidable'),
    util = require('util');

exports.uploadForm = function(req, res, event){
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
			if(percentageComplete(bytesExpected,bytesReceived)%5 === 0){
				event.emit('upload-status',{data:percentageComplete(bytesExpected,bytesReceived)});
		  	  }
		  })
		  .on('file', function(field, file) {
		    files.push([field, file]);
		  })
		  .on('end', function() {
		    console.log('-> upload done');
		    res.writeHead(200, {'content-type': 'text/plain'});
		    /*res.write('received fields:\n\n '+util.inspect(fields));
		    res.write('\n\n');
		    res.end('received files:\n\n '+util.inspect(files));*/
		    console.log(files[0][1].path);
		    res.end(files[0][1].path);
		  });
		form.parse(req);
}
