<template>
  <div>
    <el-col :span="8" :offset="6">
      <el-form label-position="right" :model="email" ref="email" label-width="100px" status-icon :rules="rules">
        <el-form-item label="收件人" prop="emailNo">
          <el-input v-model="email.eName" placeholder="收件人"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="emailName">
          <el-input v-model="email.emailAddress" placeholder="邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="发送状态" prop="unitName">
          <el-select v-model="email.status" clearable placeholder="发送状态">
            <el-option label="不发送" value="0"></el-option>
            <el-option label="发送" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleUpdate('email')">修 改</el-button>
          <el-button @click="handleCancel('email')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import util from '@/assets/js/util.js'
  export default {
    data(){
      return {
        loading: false,
        email: {
          id:'',
          eName: '',
          emailAddress: '',
          status: ''
        },
        rules: {
        }
      }
    },
    methods: {
      handleUpdate(email) {
        this.$refs[email].validate((valid) => {
          if (valid) {
            this.loading = true;
            ajaxUtil.post('/email/update', util.stringify(this.email)).then((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.push('/manager/email')
            }).catch((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'error'
              })
            });
          } else {
            return false;
          }
        });
      },
      handleCancel(email)
      {
        this.$router.push('/manager/email')
      },
      getOne(){
        ajaxUtil.get('/email/getOne/' + this.$route.params.id).then((object)=>{
            this.email=object.data
          console.log(this.email)
        }).catch(()=>{
        })
      }
    },
    created(){
      this.getOne()
    }
  }
</script>

<style>

</style>
