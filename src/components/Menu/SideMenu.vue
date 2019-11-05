<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo :show-title="!collapsed"/>
    <s-menu
      :collapsed="collapsed"
      :menu="newmenus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"></s-menu>
    <a-icon class="trigger" v-if="device !== 'mobile'" style="width:100%;border-top: 1px solid #e8e8e8;" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
    menuModel: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    newmenus: function () {
      var _menuModel = this.menuModel
      if (_menuModel === null) _menuModel = 'logistics'
      if (this.device === 'mobile') { return this.menus }
      return this.menus.filter(function (item, index, array) { // 返回数组，filter函数获取满足条件的项
        return item.meta === undefined || item.meta.model === undefined || item.meta.model === _menuModel
      })
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>
