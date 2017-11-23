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
    <el-table v-loading="loading" :data="items.result" empty-text="暂无数据" class="el-table-1" height="auto" :default-sort = "{ order: 'descending'}">
      <el-table-column sortable type="index" label="序号" width="50" align="center"/>
      <el-table-column sortable prop="itemNo" label="商品编号" align="center"/>
      <el-table-column sortable prop="itemName" label="商品名称" align="center"/>
      <el-table-column sortable prop="unitName" label="单位名称" align="center"/>
      <el-table-column sortable prop="rates" label="税率%" align="center"/>
      <el-table-column sortable prop="models" label="规格型号" align="center"/>
      <el-table-column sortable prop="price" label="单价" align="center"/>
      <el-table-column sortable prop="warnQuantity" label="库存警告数量" align="center"/>
      <el-table-column sortable prop="quantity" label="现有库存" align="center"/>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
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
          itemNo: null,
          itemName: null,
          models: null,
          pageIndex: 1,
          pageSize: 10
        },
        items: [],
      }
    },
    methods: {
      onSubmit() {
        ajaxUtil.get('/item/getPages', {
          params: {
            itemNo: this.itemQo.itemNo,
            itemName: this.itemQo.itemName,
            models: this.itemQo.models,
            pageIndex: this.itemQo.pageIndex,
            pageSize: this.itemQo.pageSize
          }
        }).then(({data}) => {
          this.items = data
          console.log(this.itemQo);
        }).catch(() => {
        });
        console.log(this.items);
      },
      handleSizeChange(val){
        this.itemQo.pageSize = val
        this.onSubmit()

      },
      handleCurrentChange(val){

        this.itemQo.pageIndex = val
        this.onSubmit()

      },
      handleEdit(index, row) {
        this.$router.push({ path: '/manager/modify/'+row.id})
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          ajaxUtil.post('/item/delete/' + row.id).then((object) => {
            console.log(object)
            if (object.code == '200') {
              this.$message({
                type: 'success',
                message: object.msg
              });
            }
          }).catch((object) => {
            this.$message({
              type: 'error',
              message: object.msg
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

  .el-table-1 {
    height: 60vh;
  }

</style>
