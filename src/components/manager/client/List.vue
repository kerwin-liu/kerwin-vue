<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="clientPageQo">
        <el-col :span="7">
          <el-form-item label="客户名称">
            <el-input v-model="clientPageQo.cName" size="small" placeholder="客户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="客户手机号">
            <el-input v-model="clientPageQo.cPhone" size="small" placeholder="客户手机号"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="级别">
            <el-select v-model="clientPageQo.cLevel" clearable placeholder="请选择客户级别">
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button size="small" type="primary" @click="addItem">新 增 客 户</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table v-loading="loading" :data="data.result" empty-text="暂无数据" class="el-table-1" height="auto"
              :default-sort="{ order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="客户地址:">
              {{ props.row.cAddress }}
            </el-form-item>
            <el-form-item label="备注:">
              {{ props.row.cRemark }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable type="index" :index="indexMethod" label="序号" width="50" align="center"/>
      <el-table-column sortable prop="cName" label="客户名称" align="center"/>
      <el-table-column sortable prop="cSex" label="客户性别" align="center"/>
      <el-table-column sortable prop="cPhone" label="客户电话" align="center"/>
      <el-table-column sortable prop="cWx" label="微信号" align="center"/>
      <el-table-column sortable prop="cQq" label="QQ号" align="center"/>
      <el-table-column sortable prop="cLevel" label="客户级别" align="center"/>
      <el-table-column sortable prop="createTime" label="创建时间" align="center"/>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改客户信息
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.currentPageNo"
        :page-sizes="[7, 20, 30, 100]"
        :page-size="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    data(){
      return {
        loading: false,
        clientPageQo: {
          cName: '',
          cPhone: '',
          cLevel: '',
          pageIndex: 1,
          pageSize: 7
        },
        data: {}
      }
    }, methods: {
      indexMethod(index) {
        return this.clientPageQo.pageIndex * this.clientPageQo.pageSize - this.clientPageQo.pageSize +index +1;
      },
      onSubmit() {
          this.loading=true
        ajaxUtil.get('/client/getPage', {
          params: {
            cName: this.clientPageQo.cName,
            cPhone: this.clientPageQo.cPhone,
            cLevel: this.clientPageQo.cLevel,
            pageIndex: this.clientPageQo.pageIndex,
            pageSize: this.clientPageQo.pageSize
          }
        }).then(({data}) => {
          this.data = data
          this.loading=false
          console.log(this.data);
        }).catch(() => {
        });
        console.log(this.data);
      },
      addItem(){
        this.$router.push({path: '/manager/clientAdd'})
      },
      handleEdit(index, row) {
        this.$router.push({path: '/manager/clientModify/' + row.id})
      },
      handleSizeChange(val){
        this.clientPageQo.pageSize = val
        this.onSubmit()

      },
      handleCurrentChange(val){
        this.clientPageQo.pageIndex = val
        this.onSubmit()

      },
    },
    created: function () {
      this.onSubmit()
    }
  }
</script>

<style scoped>
  .el-table-1 {
    height: 67vh;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
