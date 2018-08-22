<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="itemQo">
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button size="small" type="primary" @click="addEmail">新 增 收 件 人</el-button>
          </el-form-item>
        </el-col>
      </el-form>

    </el-row>

    <el-table v-loading="loading" :data="email" empty-text="暂无数据" class="el-table-1" height="auto"
              :default-sort="{ order: 'descending'}">
      <el-table-column sortable type="index"  label="序号" width="50" align="center"/>
      <el-table-column sortable prop="eName" label="收件人" align="center"/>
      <el-table-column sortable prop="emailAddress" label="邮箱地址" align="center"/>
      <el-table-column sortable prop="status" label="发送状态" align="center">
        <template slot-scope="scope">
          <span v-if='scope.row.status ==0'>不发送</span>
          <span v-if='scope.row.status ==1'>发送</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  import util from '@/assets/js/util.js'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow
    },
    data(){

      return {
        loading: false,
        email: [],
      }
    },
    methods: {
      onSubmit() {
        ajaxUtil.get('/email/getList').then(({data}) => {
          this.email = data
          console.log(this.email)
        }).catch(() => {
        });
      },
      addEmail(){
        this.$router.push({path: '/manager/emailAdd'})
      },
      handleEdit(index, row) {
        this.$router.push({path: '/manager/emailModify/' + row.id})
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
<style>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
