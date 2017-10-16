var v = new Vue({
	el:"#container",
	data:function(){
		return {
			mask:false,
			userName:''
		}
	},
	mounted:function() {
		this.init();
	},
	methods: {
		init:function(){
			var _this = this;
			this.socket = io.connect('ws://111.230.131.60:3002');
			this.video = $("#video");
			this.canvas = $('#canvas1')[0];
			this.drawCanvas = $('#canvas2')[0];
			this.ctx = this.canvas.getContext('2d');//设置canvas绘制2d图，
			this.drawCtx = this.drawCanvas.getContext('2d');
			this.video.resize(function(){
				_this.canvas.width = _this.drawCanvas.width = _this.video.width();
				_this.canvas.height = _this.drawCanvas.height = _this.video.height();
			})
			this.msgContainer = $('#msg');
			this.socket.on("message", function(obj) {
			    _this.dealMsg(obj);
			});
		},
		dealMsg:function(obj){
			var _this = this;
			switch (obj.action){
				case "addUser":
					if(obj.msg.error_code){
						this.msgContainer.html(obj.msg.error_msg);
					}else{
						this.msgContainer.html(obj.msg.user_info+"-"+"用户注册成功");
					}
					setTimeout(function(){
						_this.msgContainer.html("");
					},3000)
					break;
				case "detect":
					if(obj.msg.error_code){
						this.msgContainer.html(obj.msg.error_msg);
					}else{
						if(obj.msg.result_num==0){
							this.msgContainer.html("未扫描到人脸");
						}else if(obj.msg.result_num==1){
							var location = obj.msg.result[0].location;
							this.drawCtx.clearRect(0,0,this.drawCanvas.width,this.drawCanvas.height);
    							this.drawCtx.save();
							this.drawCtx.beginPath();
							this.drawCtx.rect(location.left,location.top,location.width,location.height);
							this.drawCtx.stroke();
							this.drawCtx.closePath();
							setTimeout(function(){
								_this.drawCtx.clearRect(0,0,_this.drawCanvas.width,_this.drawCanvas.height);
							},4000)
						}else if(obj.msg.result_num>1){
							this.msgContainer.html("存在"+obj.msg.result_num+"张人脸,请重试");
						}
					}
					setTimeout(function(){
						_this.msgContainer.html("");
					},3000)
					break;
				case "identifyUser":
					if(obj.msg.error_code){
						this.msgContainer.html(obj.msg.error_msg);
					}else{
						if(obj.msg.result[0].scores[0]<95){
							this.msgContainer.html("未识别到用户");
							
						}else{
							this.msgContainer.html("用户识别为："+obj.msg.result[0].user_info+"--匹配度为"+obj.msg.result[0].scores[0]);
						}
					}
					setTimeout(function(){
						_this.msgContainer.html("");
					},3000)
					break;
				default:
					break;
			}
		},
		register:function(){
			this.mask = true;
		},
		esc:function(){
			this.mask = false;	
		},
		action:function(action){
			if(action=="addUser"&&(this.userName==null||this.userName=="")){
				alert("注册的用户名不能为空！");
				return;
			}
			this.mask = false;	
			this.ctx.drawImage(this.video[0], 0, 0, this.canvas.width, this.canvas.height);
			var imageBase64 = this.canvas.toDataURL("image/jpeg", 1).split(",")[1];
			this.socket.emit("message", {action:action,userName:this.userName,imageBase64:imageBase64});
		}
	}
})

'use strict';
var videoElement = document.querySelector('video');
var audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
function gotDevices(deviceInfos) {
	var value = videoSelect.value;
	while(videoSelect.firstChild) {
		videoSelect.removeChild(videoSelect.firstChild);
	}
	for(var i = 0; i !== deviceInfos.length; ++i) {
		var deviceInfo = deviceInfos[i];
		var option = document.createElement('option');
		option.value = deviceInfo.deviceId;
		if(deviceInfo.kind === 'videoinput') {
			option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
			videoSelect.appendChild(option);
		} else {
			console.log('Some other kind of source/device: ', deviceInfo);
		}
	}
	if(Array.prototype.slice.call(videoSelect.childNodes).some(function(n) {
			return n.value === videoSelect.value;
		})) {
		videoSelect.value = videoSelect.value;
	}
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
	window.stream = stream; // make stream available to console
	videoElement.srcObject = stream;
	return navigator.mediaDevices.enumerateDevices();
}
function trace(arg) {
  var now = (window.performance.now() / 1000).toFixed(3);
  console.log(now + ': ', arg);
}
function handleError(error) {
	console.log('navigator.getUserMedia error: ', error);
}
function start() {
	if(window.stream) {
		window.stream.getTracks().forEach(function(track) {
			track.stop();
		});
	}
	var videoSource = videoSelect.value;
	var constraints = {
		video: {
			deviceId: videoSource ? {
				exact: videoSource
			} : undefined
		}
	};
	navigator.mediaDevices.getUserMedia(constraints).
	then(gotStream).then(gotDevices).catch(handleError);
}
videoSelect.onchange = start;
start();
