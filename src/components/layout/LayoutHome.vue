<template>
  <router-view></router-view>
</template>

<script>
  export default {
    created(){
      this.$router.push('/manager/logo')
    }
  }
</script>

<style>
</style>
