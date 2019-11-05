import { UserLayout, BasicLayout } from '@/layouts'
import routerPublic from '@/config/routers/router.public'

let childrenRouters = [...routerPublic]

// 动态加载路由文件
const routersContext = require.context('./routers', true, /\.js$/)
routersContext.keys().forEach(router => {
  const routerModule = routersContext(router)
  if (router.indexOf('router.public') > 0) {
    return
  }
  /**
  * 兼容 import export 和 require module.export 两种规范
  * 自动添加模块划分权限
  */
  const modelName = router.split('.')
  let routers = (routerModule.default || routerModule)
  if (modelName.length > 3) {
    routers = routers.map(item => {
      item.meta.model = modelName[2]
      return item
    })
  } else {
    return
  }
  childrenRouters = [...childrenRouters, ...routers]
})

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/home',
    children: childrenRouters
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { noLogin: true },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        meta: { noLogin: true },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }

    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
