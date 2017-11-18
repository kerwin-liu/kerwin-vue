<template>
  <div>
    <el-col :span="8" :offset="7">
      <el-form label-position="right" :model="item" label-width="100px" status-icon :rules="rules">
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
        <el-form-item label="库存警告数量" prop="warnQuantity">
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
  export default {
    data(){
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
          itemName: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
          unitName: [{}],
          rates: [{}],
          models: [{}],
          price: [{}],
          warnQuantity: [{}]
        }
      }
    },
    methods: {
      handleSave(item) {
        console.log(this.item)
      },
      handleCancel(item){
        console.log("取消")
      }
    }
  }
</script>

<style>

</style>
