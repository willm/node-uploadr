describe("server", function(){
	var http = require('http');
 
	it("should return 200 status code when the main page is hit", function(){
		var req = http.request({host:'localhost', port: 8080, path: '/upload'}, function  (resp){
			resp.on('data', function  (chunk){
				console.log("response:" +chunk);
			});
			
			expect(resp.statusCode).toEqual(200);
		});
		
		req.end();
	});
	
	it("should return 200 status code when the main page is hit", function(){
		/*var that = this;
		var req = http.request({host:'localhost',port: 8080,method:'POST'}, function  (resp){
			resp.on('data', function  (chunk){
				console.log("response:" +chunk);
			});
			
			console.log(that);
			//that.expect(resp.statusCode).toEqual(200);
		});
		//console.log("expect"+this.expect);
		
		
		req.end();*/
		console.log(this.expect === expect);
	});
});
