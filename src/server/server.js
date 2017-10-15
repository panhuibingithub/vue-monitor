var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//人脸识别
var AipFaceClient = require("baidu-aip-sdk").face;
// 设置APPID/AK/SK
var APP_ID = "10239695";
var API_KEY = "kWw1kPPn1216mQMT8lZoFK4G";
var SECRET_KEY = "qSTDWZd1M3qifWUMhPmblFc4gr32D0Nn";

var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');
var img = path.join(__dirname, "face2.jpg");
var image = fs.readFileSync(img);
var base64Img = new Buffer(image).toString('base64');
console.log(base64Img.substr(0,100))

//人脸监测
function detect(faceClient, base64Img,callback) {
	faceClient.detect(base64Img, { max_face_num: 1 }).then(function(result) {
		 console.log(JSON.stringify(result).substr(0,100));
		callback(result);
	});
}
//人脸注册
function addUser(faceClient, uid, userInfo, groups, base64Img,callback) {
	faceClient.addUser(uid, userInfo, groups, base64Img).then(function(result) {
		 console.log(JSON.stringify(result).substr(0,100));
		callback(result);
	});
}
//跟新人脸
function updateUser(faceClient,uid,userInfo,groupId,base64Img,callback){
	faceClient.updateUser(uid, userInfo, groupId, base64Img).then(function(result) {
	     console.log(JSON.stringify(result).substr(0,100));
	    callback(result);
	});
}
//删除人脸
function  deleteUser(faceClient,uid,callback){
	faceClient.deleteUser(uid).then(function(result) {
	     console.log(JSON.stringify(result).substr(0,100));
	     callback(result);
	});
}
//获取用户信息
function getUser(faceClient,uid,group_id,callback){
	faceClient.getUser(uid,{group_id:group_id}).then(function(result) {
	     console.log(JSON.stringify(result).substr(0,100));
	    callback(result);
	});
}

//人脸对比
function match(faceClient, base64Img1, base64Img2,callback) {
	faceClient.match([base64Img1, base64Img2]).then(function(result) {
		 console.log(JSON.stringify(result).substr(0,100));
		callback(result);
	});
}

//人脸识别
function identifyUser(faceClient,groupIds, base64Img,callback) {
	faceClient.identifyUser(groupIds, base64Img, { usertopnum: 5 }).then(function(result) {
		 console.log(JSON.stringify(result).substr(0,100));
		callback(result);
	});
}
//组内用户列表查询
function getGroupUsers(faceClient,groupId,callback) {
	// 查询组内指定范围用户列表
	faceClient.getGroupUsers(groupId, {start: 0, end: 100}).then(function(result) {
	    console.log(JSON.stringify(result).substr(0,100));
	    callback(result);
	});
}

app.get('/', function(req, res) {
	res.send('<h1>Welcome Realtime Server</h1>');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on("disconnect", function() {
		console.log("a user go out");
	});
	socket.on("message", function(obj) {
		//解析图片，处理图片
		switch (obj.action){
			case "addUser":
				console.log("addUser");
				addUser(client, 'panhuibin', 'testName', ['group1'], obj.imageBase64,function(res){
					console.log("addUser callback");
					res.uid = 'panhuibin';
					res.user_info = 'testName';
					io.emit("message", {action:"addUser",msg:res});
				});
				break;
			case "detect":
				console.log("detect");
				detect(client, obj.imageBase64,function(res){
					console.log("detect callback");
					io.emit("message", {action:"detect",msg:res});
				});
				break;
			case "identifyUser":
				console.log("identifyUser");
				identifyUser(client,"group1", obj.imageBase64,function(res){
					console.log("identifyUser callback");
					io.emit("message", {action:"identifyUser",msg:res});
				});
				break;
			default:
				break;
		}
	});
});

http.listen(3002, function() {
	console.log('listening on *:3002');
});