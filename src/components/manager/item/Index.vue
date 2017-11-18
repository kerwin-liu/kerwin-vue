<template>
  <div>
    <el-form :inline="true" :model="itemQo">
      <el-form-item label="商品编号">
        <el-input v-model="itemQo.item_no" placeholder="商品编号"/>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="itemQo.item_name" placeholder="商品编号"/>
      </el-form-item>
      <el-form-item label="规格型号">
        <el-input v-model="itemQo.models" placeholder="规格型号"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="manage-header">
      <router-link to="/manager/insert">
        <el-button type="primary">新 增</el-button>
      </router-link>
    </div>
    <el-table>

    </el-table>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  export default {
    data(){
      return {
        itemQo: {
          item_no: '',
          item_name: '',
          models: ''
        },
        items: []
      }
    },
    methods: {
      onSubmit() {
          ajaxUtil.get('/item/getPages').then(({data})=>{
              this.items=data
          }).catch(() => {
          });
        console.log(this.items);
      }
    }
  }
</script>

<style scoped>
.manage-header{
text-align: right;
}
</style>
