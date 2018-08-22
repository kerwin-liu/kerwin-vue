<template>
    <div></div>
</template>

<script>
    import ajaxUtil from '@/config/ajaxUtil.js'
    export default {
        data(){
            return {
              inventory:{}
            }
        },
      methods:{
        getOne(){
          ajaxUtil.get('/inventory/getOne/' + this.$route.params.id).then((object)=>{
            this.inventory=object.data
          }).catch(()=>{
          })
        }
      },
      created(){
        this.getOne()
      }
    }
</script>

<style scoped>

</style>
