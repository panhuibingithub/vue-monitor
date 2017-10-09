<template>

	<imp-panel>
		<h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
          <router-link :to="{ path: 'deviceAdd'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </h3>
		<div slot="body">
			<el-table :data="tableData.rows" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="device_id" label="设备编号" >
				</el-table-column>
				<el-table-column prop="device_name" label="设备名称">
				</el-table-column>
				<el-table-column prop="device_mac" label="设备mac">
				</el-table-column>
				<el-table-column prop="device_ip" label="设备ip">
				</el-table-column>
				<el-table-column prop="device_account" label="设备账户">
				</el-table-column>
				<el-table-column prop="device_pwd" label="设备密码">
				</el-table-column>
				<el-table-column prop="device_model" label="设备型号">
				</el-table-column>
				<el-table-column prop="device_state" label="设备状态">
				</el-table-column>
				<el-table-column prop="publish_addr" label="视频发布地址">
				</el-table-column>
				<el-table-column label="操作" width="160">
					<template scope="scope">
						<el-button size="small" type="default" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
		</div>

	</imp-panel>
</template>

<script>
	import panel from "../../components/panel.vue"
	import * as api from "../../api"

	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			return {
				currentRow: {},
				dialogVisible: false,
				dialogLoading: false,
				defaultProps: {
					children: 'children',
					label: 'name',
					id: "id",
				},
				roleTree: [],
				listLoading: false,
				searchKey: '',
				tableData: {
					pagination: {
						total: 0,
						pageNo: 1,
						pageSize: 10,
						parentId: 0
					},
					rows: []
				}
			}
		},
		methods: {
			search(target) {
				this.loadData();
			},
			handleSelectionChange(val) {

			},
			handleRoleConfig(index, row) {
				this.currentRow = row;
				this.dialogVisible = true;
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData();
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData();
			},
			handleEdit(index, row) {
				this.$router.push({
					path: 'deviceAdd',
					query: row
				})
			},
			handleDelete(index, row) {
				this.$confirm('确认删除吗', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.$http.post(api.DEVICE_DELETE,{device_id:row.device_id}).then(res => {
						this.loadData();
					});
				}).catch(()=>{
					
				})
				
			},
			loadData() {
				this.$http.get(api.DEVICE_GET).then(res => {
					this.tableData.rows = res.data.data;
				});
				
			}
		},
		created() {
			this.loadData();
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>