import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/login/Login')
    },{
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
          path: 'item',
          name: '商品管理',
          component: () => import('../components/manager/item/Index')
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
          name: '出入库明细',
          component: () => import('../components/repertory/Log')
        }
      ]
    }
  ]
})
