<template>
	<div class="monitor-box">
		<ul class="camera-list">
			<li class="tit">摄像头列表</li>
			<li v-for="(item,index) in list" @click="play(item)" >
				{{item.device_name}}
			</li>
		</ul>
		<div class="media-wrapper" style="height: 500px;">
			<video webkit-playsinline playsinline width="100%" height="100%" preload="auto" style="max-width:100%;max-height: 100%;">
				 <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4">
			</video>
		</div>
	</div>
	
</template>
<script>
	import player from 'player';
	import 'playerCss';
	import * as api from "../../api";
	import $ from 'jquery';
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				list:[]
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$http.get(api.DEVICE_GET).then(res => {
					this.list= res.data.data;
				});
				var mediaElements = document.querySelectorAll('video'),
					total = mediaElements.length;
				for(let i = 0; i < total; i++) {
					new MediaElementPlayer(mediaElements[i], {
						pluginPath: '../lib/',
						stretching: 'fill',
						success: function(media) {
							$('.media-wrapper').height("500px");
							media.addEventListener('loadedmetadata', function() {
							});
							media.addEventListener('error', function(e) {
							});
						}
					});
				}
			},
			play(item){
				var media = document.querySelector('.mejs__container').id,
					player = mejs.players[media];
				player.setSrc(item.publish_addr.replace('&amp;', '&'));
				player.load();
				player.play();
			}
		}
	}
</script>

<style scoped lang="less">
	.monitor-box{
		width: 100%;
		height: 500px;
		padding-left: 120px;
	}
	.camera-list{
		width: 110px;
		height: 500px;
		float: left;
		margin-left: -120px;
		li{
			&.tit{
				height: 50px;
				line-height: 50px;
				font-size: 20px;
			}
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			cursor: pointer;
			border-bottom: solid 1px #000000;
		}
	}
	.media-wrapper {
		float: left;
		width: 100%;
		height: 500px;
		background: #222;
	}
</style>