var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("disconnect", function() {
        console.log("a user go out");
    });
    socket.on("message", function(obj) {
    		//解析图片，处理图片
    		console.log("getImg---"+obj.imageBase64.substr(0,40));
		flag = Math.random(); 
		var msg = '';
		if(flag>0.6){
			msg = obj.user+"识别成功";
		}else{
			msg = obj.user+"请调整对准位置";
		}
        io.emit("message", msg);
    });
});

http.listen(3002, function(){
    console.log('listening on *:3002');
});