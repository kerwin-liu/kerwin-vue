<template>
  <div>
    用户名：<input v-model="userForm.userName" placeholder="请输入用户名"><br/>
    密码：<input v-model="userForm.password" placeholder="请输入密码"><br/>
    <button @click="loginpost">登录</button>
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
      loginpost(userForm) {
        ajaxUtil.post('/login', util.stringify(this.userForm)).then(({code}) => {
          console.log(code)
          this.$router.push('/index')
        })
      }
    }
  }
</script>

<style>

</style>
