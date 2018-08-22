<template>
  <div>
    <el-col :span="8" :offset="6">
      <el-form label-position="right" :model="client" ref="client" label-width="100px" status-icon :rules="rules">
        <el-form-item label="客户名称" prop="cName">
          <el-input v-model="client.cName" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户性别" prop="cSex">
          <el-radio v-model="client.cSex" label="0">女</el-radio>
          <el-radio v-model="client.cSex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="客户手机号" prop="cPhone">
          <el-input v-model="client.cPhone" placeholder="客户手机号"></el-input>
        </el-form-item>
        <el-form-item label="客户收货地址" prop="cAddress">
          <el-input v-model="client.cAddress" placeholder="客户收货地址">
          </el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="cWx">
          <el-input v-model="client.cWx" placeholder="微信号"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="cQq">
          <el-input v-model="client.cQq" placeholder="QQ号"></el-input>
        </el-form-item>
        <el-form-item label="客户级别" prop="cLevel">
          <el-select v-model="client.cLevel" clearable placeholder="请选择客户级别">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="cRemark">
          <el-input v-model="client.cRemark" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleUpdate('client')">修 改</el-button>
          <el-button @click="handleCancel('client')">取 消</el-button>
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
        client: {
          id: '',
          cName: '',
          cSex: '',
          cPhone: '',
          cAddress: '',
          cWx: '',
          cQq: '',
          cLevel: '',
          cRemark: ''
        },
        data: {},
        rules: {
          cName: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
            {min: 1, max: 20, message: '编号不能超过20位', trigger: 'blur'}
          ],
          cSex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          cPhone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {min: 11, max: 11, message: '电话必须是11位', trigger: 'blur'}
          ],
          cLevel: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleUpdate(client) {
        this.$refs[client].validate((valid) => {
          if (valid) {
            this.loading = true;
            ajaxUtil.post('/client/update', util.stringify(this.client)).then((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.push('/manager/clientList')
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
      handleCancel(client)
      {
        this.$router.push('/manager/clientList')
      },
      getOne(){
        ajaxUtil.get('/client/getOne/' + this.$route.params.id).then((object) => {
          this.client = object.data
        }).catch(() => {
        })
      }
    },
    created(){
      this.getOne()
    }
  }
</script>

<style scoped>

</style>
