<template>
<div>
<!--  <el-container>
    <el-header
      height="15vh">
      朗润食品有限公司管理系统
    </el-header>
    <el-main
      height="80vh"
    >
      用户名：<input v-model="userForm.userName" placeholder="请输入用户名"><br/>
      密码：<input v-model="userForm.password" placeholder="请输入密码"><br/>
      <button @click="loginpost">登录</button>
    </el-main>
    <el-footer
      height="5vh"
    >
      Kerwin 制作
    </el-footer>
  </el-container>-->
  <title>朗润食品有限公司管理系统</title>
  <div class="videozz"></div>

  <div class="box">
    <div class="box-a">
      <div class="m-2">
        <div class="m-2-1">
            <div class="m-2-2">
              <input v-model="userForm.userName" placeholder="请输入用户名"><br/>
            </div>
            <div class="m-2-2">
              <input v-model="userForm.password" placeholder="请输入密码"><br/>
            </div>
            <div class="m-2-2">
              <button @click="loginpost">登录</button>
            </div>
        </div>
      </div>
      <div class="m-5"> \

        <div id="m-5-id-1">
          <div id="m-5-2">
            <div id="m-5-id-2">
            </div>
            <div id="m-5-id-3"></div>
          </div>
        </div>
      </div>
      <div class="m-10"></div>
      <div class="m-xz7"></div>
      <div class="m-xz8 xzleft"></div>
      <div class="m-xz9"></div>
      <div class="m-xz9-1"></div>
      <div id="m-3-id-1"></div>

      <!-- <div class="m-x10"></div>
      <div class="m-x11"></div>
      <div class="m-x12 xzleft"></div>
      <div class="m-x13"></div>
      <div class="m-x14 xzleft"></div>
      <div class="m-x15"></div>
      <div class="m-x16 xzleft"></div>-->
      <div class="m-x17 xzleft"></div>
      <div class="m-x18"></div>
      <div class="m-x19 xzleft"></div>
      <div class="m-x20"></div>
      <div class="m-8"></div>
      <div class="m-9"><div class="masked1" id="sx8">朗润食品有限公司管理系统</div></div>
      <div class="m-11">
        <div class="m-k-1"><div class="t1"></div></div>
        <div class="m-k-2"><div class="t2"></div></div>
        <div class="m-k-3"><div class="t3"></div></div>
        <div class="m-k-4"><div class="t4"></div></div>
        <div class="m-k-5"><div class="t5"></div></div>
        <div class="m-k-6"><div class="t6"></div></div>
        <div class="m-k-7"><div class="t7"></div></div>
      </div>
      <div class="m-14"><div class="ss"></div></div>
      <div class="m-15-a">
        <div class="m-15-k">
          <div class="m-15xz1">
            <div class="m-15-dd2"></div>
          </div>
        </div>
      </div>
      <div class="m-16"></div>
      <div class="m-17"></div>
      <div class="m-18 xzleft"></div>
      <div class="m-19"></div>
      <div class="m-20 xzleft"></div>
      <div class="m-21"></div>
      <div class="m-22"></div>
      <div class="m-23 xzleft"></div>
      <div class="m-24" id="localtime"></div>
    </div>
  </div>
</div>
</template>
<script>
  import util from '@/assets/js/util'
  import ajaxUtil from '@/config/ajaxUtil'
  export default {
    data () {
      return {
        userForm: {
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      loginpost() {
        ajaxUtil.post('/login', util.stringify(this.userForm)).then(({code}) => {
          console.log(code)
          console.log(this.userForm)
          this.$router.push('/index')
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../../static/css/style.css';
  .el-header {
    padding:0px;
    text-align: center;
    height: 10px;
  }
  .el-footer{
    padding:0px;
    text-align: center;
  }
  .el-main {
    padding:0px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
