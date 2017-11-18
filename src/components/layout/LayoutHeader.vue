<template>
  <el-row class="header">
    <el-col :span="24" class="Header-Title">
      管理系统
    </el-col>
    <el-col :span="6" class="header-option">
      <div class="bowOut">
        <a @click.prevent="handleLogout">退出</a>
      </div>
      <div class="header-pwd">
        <router-link to="/updatePassword">
          修改密码
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {}
</script>

<style scoped>
  .header {
    width: 100%;
    height: 10vh;
    position: relative;
    background: #EFF2F7;
    top: 0;
    bottom: 0;
    z-index: 1000;
    line-height: 60px;
    opacity:0.5;
  }

  .header-option div {
    display: inline-block;
  }
  .header-option  {
    float: right;
  }
  .header-pwd {
    width: 65px;
    float: right;
  }

  .header a {
    color: #1F2D3D;
    font-size: 14px;
  }

  .header a:hover {
    color: #20A0FF;
    cursor: pointer;
  }
  .bowOut{
    float: right;
    margin-right:30px
  }
  .Header-Title{
    font-size: 40px ;
    color: black;
    text-align: center;
  }
</style>
