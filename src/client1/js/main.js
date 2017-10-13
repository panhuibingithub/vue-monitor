/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

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
var socket = io.connect('ws://192.168.74.230:3002');
var video = document.getElementById("video");
var canvas = document.querySelectorAll('canvas')[0];
var ctx = canvas.getContext('2d');//设置canvas绘制2d图，
canvas.width = 375;
canvas.height = 280;

var user = 'user'+Math.random()*1000;

function sendMsg(){
	ctx.drawImage(video, 0, 0, 375, 280);
	var imageBase64 = canvas.toDataURL('image/png');
	socket.emit("message", {user:user,imageBase64:imageBase64});
}
var msgContainer = document.querySelector('#msg');
socket.on("message", function(msg) {
    msgContainer.innerHTML = msg;
});
