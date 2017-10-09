<template>
  <imp-panel :title="form.user_id? '编辑':'新增用户'">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="登录用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.user_role">
          <el-radio label="管理员">管理员</el-radio>
          <el-radio label="物业">物业</el-radio>
          <el-radio label="业主">业主</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onEditSubmit" v-if="form.user_id">保存</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>
<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        form: {
        		user_name:'',
        		user_role:'',
        		telephone:'',
        		password:''
        }
      }
    },
    created(){
      this.loadData();
    },
    methods: {
      onSubmit(){
        this.$http.post(api.SYS_USER_ADD, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('添加成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'userList'})
            })
          })
      },
      onEditSubmit(){
        this.$http.post(api.SYS_USER_UPDATE, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('修改成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'userList'})
            })
          })
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.user_id && this.$route.query.user_id != null) {
          this.form = this.$route.query;
        }
      }
    }
  }
</script>
