<template>
  <div>
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <template v-for="item in items">
          <template v-if="item.mLevel=='1'">
            <el-submenu :index="item.id" v-if="!item.hidden">
              <template slot="title">{{item.mName}}</template>
              <template :index="child.id" v-for="child in items">
                <template v-if="child.parentId==item.id">
                  <router-link :to="item.url + child.url">
                    <el-menu-item :index="child.url">{{child.mName}}</el-menu-item>
                  </router-link>
                </template>
              </template>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import ajaxUtil from '@/config/ajaxUtil.js'
  export default {
    data() {
      return {
        items: []
      };
    },
    methods: {
      getMenus() {
        ajaxUtil.get('/menus').then(({data}) => {
          this.items = data
          console.log(this.items)
        }).catch(() => {
        });
      }
    },
    created: function () {
      this.getMenus()
    }
  }
</script>

<style scoped>
  .el-col {
    height: 85vh;
  }

  .el-submenu .el-menu-item {
    min-width: 0px;
  }
</style>
