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
      children:[{
        path: 'user',
        name: '用户管理',
        component: () => import('../components/manager/user/Index')
      },{
        path: 'item',
        name: '商品管理',
        component: () => import('../components/manager/item/Index')
      },
        {
          path: 'insert',
          name: '新增商品',
          component: () => import('../components/manager/item/Add')
        }
      ]
    }
  ]
})
