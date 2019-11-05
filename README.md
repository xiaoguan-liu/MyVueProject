# 开发须知

框架链接
----
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [Ant-Design-Pro-of-Vue](https://pro.loacg.com/docs/getting-started) - Ant Design Pro Of Vue 实现

第三方组件
---
- [v-charts](https://v-charts.js.org/#/) - v-charts图标组件

指令说明
---
- 所有指令均可以在vscode的终端-运行任务中快捷调用
- 除了常用的几个命令以外还有快捷增加模板指令
```
yarn new:comp 生成组件代码指令,加 global/ 前缀则为生成全局组件
yarn new:view 生成vue基础页面代码,只包含基础页面代码
yarn new:viewList 生成vue列表页面代码,包含列表页面和edit页面,代码包含了基本的逻辑,需要自行添加列表项和edit页面的录入项
yarn new:api 生成vue api文件代码,包含增删改查这几个基本API
```

自定义组件
---
- 自定义组件目录components
```
按照组件划分文件夹,可以在文件夹中增加README.md补充说明组件使用方法
```
- 自定义全局组件目录components/global
```
按照组件划分文件夹,放在全局组件目录的组件会在启动时自动扫描注册,无需引用,VueIco为示例项目
```

规范
----

- 所有页面均放在src/views文件夹下,文件夹按照模块功能划分
- 所有组件放在src/components文件夹下,文件夹按照组件划分
- 路由在src/config文件夹中router.config.js
- 所有与服务端交互的代码均放在src/api中,且统一引用import { axios } from '@/utils/request'

增删改查页面
----
- 列表页面使用src/layouts/ListLayout作为模板
- 编辑页面使用src/layouts/EditLayout作为模板
- 所有界面的功能均以以上2个模板作为基础,如果的特殊需求则先和负责人联系调整模板,不得擅自修改模板和弃用模板改为自己另行实现
- 列表页面和编辑页面放在同级目录中,文件名前缀保持一致

模态窗口
----
- 模态窗口放在列表页面同级目录中的modals目录下,且模态窗口和列表页面的文件名前缀保持一致
```
如:列表页面文件名为OceanFreight.vue,则模态窗口文件名为OceanFreightDetail.vue
```

路由设置
----
- 路由划分
```
路由主配置文件为src\config\router.config.js,用来配置登录前页面和公共页面的路由
登录后模块页面路由均放在\src\config\routers文件夹下,并按照"router.模块名称.js"规则命名,不同模块的路由文件对应页面顶部的模块菜单
模块划分说明:公共页面(在所有模块菜单中均显示):public;物流服务:logistics;互联网金融:financial;系统管理:system
除公共页面外,其他模块页面路由均为自动加载,无需手工引用
```
- 增删改查的页面注意事项
```
路由必须放在列表页路由的子集中,以保证Breadcrumbs的层次结构
hideChildrenInMenu: true, //编辑页面不在菜单中出现
component: RouteReplaceSelf(() => import('列表页views地址')), //加载编辑页的时候跳过列表页的渲染,并缓存列表页
路由的各项属性可以参考\src\router\README.md和路由文件上方的说明
```

store使用技巧
---
- 常用的数据必须存放到store中,如用户信息.不常用的如列表页面,增删改查这些只有一个组件调用的可以不放到store里

- 使用小技巧
> 我们通过 mapAction、mapGetters来调用Action和getters 我们需要写上这些代码
```javascript
import { mapActions, mapGetters } from 'vuex'

computed: {
    ...mapGetters(['getNewsResponse'])
},
methods: {
    ...mapActions(['NEWS_LIST'])
}
```
> 在假设，在另一个页面又需要重新调用获取这些接口,导致重复写以上的代码。这时候Vue提供的Mixin就起了大作用了在 src下创建一个mixins目录，用来管理所有的mixins 新建一个xx.mixin.js
```javascript
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getNewsResponse'])
  },
  methods: {
    ...mapActions(['NEWS_LIST'])
  }
}
```
> 然后在需要用到的组件中引入这个mixin，就能直接调用这个方法了。不管多少个页面，只要引入这个mixin，直接就能使用。需求一改的话，也只需要修改这个mixin文件
```javascript
// 调用方法
import Vue from 'vue'
import newsMixin from '@/mixins/news-mixin'
export default {
  name: 'news',
  mixins: [newsMixin],
  data () {
    return {}
  },
  async created () {
    await this.NEWS_LIST()
    console.log(this.getNewsResponse)
  }
}
```