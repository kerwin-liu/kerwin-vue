<template>
  <div>
    <el-form :inline="true" :model="user">
      <el-form-item label="姓名">
        <el-input v-model="user.userName" placeholder="用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.sex" placeholder="性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
        <template v-for="item in userList">
          <el-table-column prop="item.id" label="id" width="180"></el-table-column>
          <el-table-column prop="item.name" label="用戶名" width="180"></el-table-column>
        </template>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          userName: '',
          sex: ''
        },
        userList: []
      }
    },
    methods: {
      onSubmit() {
        console.log(this.user);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
