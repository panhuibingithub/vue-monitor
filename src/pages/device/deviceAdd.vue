<template>
	<imp-panel :title="form.device_id ? '编辑':'新增设备'">
		<el-form ref="form" :model="form" label-width="180px">
			<el-form-item label="设备名称">
				<el-input v-model="form.device_name"></el-input>
			</el-form-item>
			<el-form-item label="设备mac">
				<el-input v-model="form.device_mac"></el-input>
			</el-form-item>
			<el-form-item label="设备ip">
				<el-input v-model="form.device_ip"></el-input>
			</el-form-item>
			<el-form-item label="设备账户">
				<el-input v-model="form.device_account"></el-input>
			</el-form-item>
			<el-form-item label="设备密码">
				<el-input v-model="form.device_pwd"></el-input>
			</el-form-item>
			<el-form-item label="设备型号">
				<el-input v-model="form.device_model"></el-input>
			</el-form-item>
			<el-form-item label="设备状态">
				<el-input v-model="form.device_state"></el-input>
			</el-form-item>
			<el-form-item label="视频发布地址">
				<el-input v-model="form.publish_addr"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="info" @click="onEditSubmit" v-if="form.device_id">保存</el-button>
				<el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
			</el-form-item>
		</el-form>
	</imp-panel>
</template>
<script>
	import panel from "../../components/panel.vue";
	import * as api from "../../api";

	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			return {
				form: {
				}
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			onSubmit() {
				this.$http.post(api.DEVICE_ADD, this.form).then(res => {
					this.$confirm('添加成功, 是否返回列表?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'success'
					}).then(() => {
						this.$router.push({path: 'device'})
					})
				})
			},
			onEditSubmit() {
				this.$http.post(api.DEVICE_UPDATE, this.form)
					.then(res => {
						this.$confirm('修改成功, 是否返回列表?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'success'
						}).then(() => {
							this.$router.push({
								path: 'device'
							})
						})
					})
			},
			loadData() {
				if(this.$route.query && this.$route.query != null && this.$route.query.device_id && this.$route.query.device_id != null) {
					this.form = {
						"device_id": this.$route.query.device_id,
						"device_name": this.$route.query.device_name,
						"device_ip": this.$route.query.device_ip,
						"device_mac": this.$route.query.device_mac,
						"device_account": this.$route.query.device_account,
						"device_pwd": this.$route.query.device_pwd,
						"device_type": this.$route.query.device_type,
						"device_model": this.$route.query.device_model,
						"device_state": this.$route.query.device_state,
						"publish_addr": this.$route.query.publish_addr
					}
				}
			}
		}
	}
</script>