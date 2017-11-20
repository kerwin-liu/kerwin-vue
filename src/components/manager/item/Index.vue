<template>
  <div>
    <el-form :inline="true" :model="itemQo">
      <el-form-item label="商品编号">
        <el-input v-model="itemQo.itemNo" placeholder="商品编号"/>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="itemQo.itemName" placeholder="商品编号"/>
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
        <el-button type="primary">新 增 商 品</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="items.result" empty-text="暂无数据">
      <el-table-column type="index" label="序号" width="70" align="center"/>
      <el-table-column prop="itemNo" label="商品编号" align="center"/>
      <el-table-column prop="itemName" label="商品名称" align="center"/>
      <el-table-column prop="unitName" label="单位名称" align="center"/>
      <el-table-column prop="rates" label="税率%" align="center"/>
      <el-table-column prop="models" label="规格型号" align="center"/>
      <el-table-column prop="price" label="单价" align="center"/>
      <el-table-column prop="warnQuantity" label="库存警告数量" align="center"/>
      <el-table-column prop="quantity" label="现有库存" align="center"/>
    </el-table>

    <div class="block paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="items.currentPageNo"
        :page-sizes="[10, 20, 30, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import util from '@/assets/js/util.js'
  export default {
    data(){

      return {
        loading: false,
        itemQo: {
          itemNo: '',
          itemName: '',
          models: '',
          pageIndex: 1,
          pageSize: 10
        },
        items: []
      }
    },
    methods: {
      onSubmit() {
        ajaxUtil.get('/item/getPages',util.stringify(this.itemQo)).then(({data}) => {
          this.items = data
          console.log(this.itemQo);
        }).catch(() => {
        });
        console.log(this.items);
      },
      handleSizeChange(val){
        this.itemQo.pageSize = val
        this.onSubmit()
          console.log(this.itemQo.pageSize)

      },
      handleCurrentChange(val){
        this.itemQo.pageIndex = val
        this.onSubmit()
          console.log(`当前页: ${val}`)

      }
    },
    created: function () {
      this.onSubmit()
    }
  }
</script>

<style scoped>
  .manage-header {
    text-align: right;
  }
</style>
