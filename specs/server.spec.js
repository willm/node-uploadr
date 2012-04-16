describe("server", function(){
	var http = require('http');
 
	it("should return 200 status code when the main page is hit", function(){
		var req = http.request({host:'localhost',port: 8080}, function  (resp){
			resp.on('data', function  (chunk){
				console.log("response:" +chunk);
			});
			
			expect(resp.statusCode).toEqual(200);
		});
		
		req.end();
	});
});
