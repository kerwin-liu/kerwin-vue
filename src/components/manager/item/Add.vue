<template>
  <div>
    <el-col :span="8" :offset="6">
      <el-form label-position="right" :model="item" ref="item" label-width="100px" status-icon :rules="rules">
        <el-form-item label="商品编号" prop="itemNo">
          <el-input v-model="item.itemNo" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="itemName">
          <el-input v-model="item.itemName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="item.unitName" placeholder="单位名称"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="rates">
          <el-input v-model="item.rates" placeholder="税率"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" prop="models">
          <el-input v-model="item.models" placeholder="规格型号"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="item.price" placeholder="单价"></el-input>
        </el-form-item>
        <el-form-item label="库存警告数" prop="warnQuantity">
          <el-input v-model="item.warnQuantity" placeholder="库存警告数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSave('item')">保 存</el-button>
          <el-button @click="handleCancel('item')">取 消</el-button>
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
      var validateWarnQuantity = (rule, value, callback) => {
        let regular = /^[0-9]{1,9}([.]+[0-9]{0,4})?$/;
        if (!regular.test(value)) {
          return callback(new Error('请填写正确的库存警告数量'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        item: {
          itemNo: '',
          itemName: '',
          unitName: '',
          rates: '',
          models: '',
          price: '',
          warnQuantity: ''
        },
        rules: {
          itemNo: [
            {required: true, message: '请输入商品编号', trigger: 'blur'},
            {min: 1, max: 10, message: '编号不能超过10位', trigger: 'blur'}
          ],
          itemName: [{required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 1, max: 20, message: '商品名称不能超过20位', trigger: 'blur'}
          ],
          unitName: [{required: true, message: '请输入单位名称', trigger: 'blur'},
            {min: 1, max: 20, message: '单位名称不能超过10位', trigger: 'blur'}],
          warnQuantity: [{required: true, message: '请输入库存警告数量'},
            {validator: validateWarnQuantity, trigger: 'blur'}]
        }
      }
    },
    methods: {
      handleSave(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            this.loading = true;
            ajaxUtil.post('/item/save', util.stringify(this.item)).then((data) => {
              this.loading = false
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.push('/manager/item')
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
      handleCancel(item)
      {
        this.$router.push('/manager/item')
      }
    }
  }
</script>

<style>

</style>
