import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/login/Login')
    }, {
      path: '/index',
      name: 'index',
      component: () => import('../components/layout/Layout')
    },
    {
      path: '/manager',
      name: '基础管理',
      component: () => import('../components/layout/Layout'),
      children: [
        {
          path: 'user',
          name: '用户管理',
          component: () => import('../components/manager/user/Index')
        },
        {
          path: 'logo',
          name: '图标',
          component: () => import('../components/layout/Logo')
        },
        {
          path: 'item',
          name: '商品管理',
          component: () => import('../components/manager/item/Index'),
        },
        {
          path: 'insert',
          name: '新增商品',
          component: () => import('../components/manager/item/Add')
        },
        {
          path: 'modify/:id',
          name: '修改商品',
          component: () => import('../components/manager/item/Modify')
        },
        {
          path: 'clientList',
          name: '客户列表',
          component: () => import('../components/manager/client/List')
        },
        {
          path: 'clientAdd',
          name: '客户添加',
          component: () => import('../components/manager/client/Add')
        },
        {
          path: 'clientModify/:id',
          name: '客户修改',
          component: () => import('../components/manager/client/Modify')
        },
        {
          path: 'email',
          name: '邮件管理',
          component: () => import('../components/manager/email/Index')
        },
        {
          path: 'emailAdd',
          name: '邮件增加',
          component: () => import('../components/manager/email/Add')
        },
        {
          path: 'emailModify/:id',
          name: '邮件修改',
          component: () => import('../components/manager/email/Modify')
        }
      ]
    },
    {
      path: '/repertory',
      name: '仓库管理',
      component: () => import('../components/layout/Layout'),
      children: [
        {
          path: 'insert',
          name: '商品入库',
          component: () => import('../components/repertory/Insert')
        },
        {
          path: 'query',
          name: '查询库存',
          component: () => import('../components/repertory/List')
        },
        {
          path: 'log',
          name: '库存日志',
          component: () => import('../components/repertory/Log')
        },
        {
          path: 'upload',
          name: '上传发票',
          component: () => import('../components/repertory/Upload')
        },
        {
          path: 'modify/:id',
          name: '修改入库信息',
          component: () => import('../components/repertory/Modify')
        },
        {
          path: 'inventoryLog/:id',
          name: '货物出库',
          component: () => import('../components/repertory/InventoryLog')
        },
        {
          path: 'inventoryLogReturn/:id',
          name: '退货处理',
          component: () => import('../components/repertory/InventoryLogReturn')
        },
        {
          path: 'statistics',
          name: '按商品统计',
          component: () => import('../components/repertory/Statistics')
        },
        {
          path: 'statisticsByClient',
            name: '按客户统计',
          component: () => import('../components/repertory/StatisticsByClient')
        }
      ]
    }
  ]
})
