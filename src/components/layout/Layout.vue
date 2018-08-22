<template>
  <el-container class="layout">
    <el-header style="height: 10vh;">
      <v-header></v-header>
    </el-header>
    <el-container>
      <el-aside style="width: 20vh;">
        <v-menu></v-menu>
      </el-aside>
      <el-main>
        <v-home></v-home>
      </el-main>
    </el-container>
    <el-container>
      <el-footer style="height: 5vh;">kerwin制作</el-footer>
    </el-container>
  </el-container>


</template>

<script>
  import vHeader from './LayoutHeader'
  import vHome from './LayoutHome'
  import vMenu from './LayoutMenu'
  export default {
    components: {
      vHeader,
      vMenu,
      vHome
    }
  }
</script>

<style scoped>
  .layout {
    /*background-image: url("../../assets/image/tree.jpg");*/
    background-size: 100% 100%;
    opacity: 0.6;
  }

  .el-header {
    padding: 0px;
    text-align: center;
  }

  .el-footer {
    text-align: center;
  }
</style>

