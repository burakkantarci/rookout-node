const rookout = require('rookout');
var http = require("http");

rookout.start({
    token: '3218529d13a02689038f3648c8ada18afc50df01d9cdad08feb5010c16d1771b',
    labels:
        {
            "env":"dev" // Optional,see Labels page below Projects
        }
});

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
   response.end('Test\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');