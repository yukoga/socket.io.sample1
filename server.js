var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	url = require('url'),
	qstring = require('querystring');

	app.listen(8012);

	function handler(req, res){
		var reqObj = url.parse(req.url);
		console.log(reqObj);
		console.log(qstring.parse(reqObj.query).foo);
		fs.readFile('index.html', function (err, data) {
			console.log(err);
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	}

io.sockets.on('connection', function (socket) {
	console.log('Socket created...');
	socket.emit('Initialdata', { Message: 'world' });
	socket.on('sendMessage', function (data) {
		socket.broadcast.emit('recieveMessage', data);
	});
});
