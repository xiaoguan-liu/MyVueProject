<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }"
      >
        <div v-if="mode === 'sidemenu'" class="header">
          <a-icon
            v-if="device==='mobile'"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"
          />
          <!-- <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle"/> -->
          <div v-if="device!=='mobile'" id="header-menu">
            <a-menu v-model="selectMenuModel" @select="headerMenuSelect" mode="horizontal">
              <template v-for="model in systemModel">
                <a-menu-item :key="model.key">{{ model.title }}</a-menu-item>
              </template>
            </a-menu>
          </div>
          <user-menu></user-menu>
        </div>
        <!-- 取消横向菜单模式 -->
        <!-- <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'"/>
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
            <user-menu class="header-index-right"></user-menu>
          </div>
        </div>-->
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import { mixin } from '@/utils/mixin'
import { SystemModel } from '@/api/enumarray'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    },
    menuModel: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0,
      systemModel: [],
      selectMenuModel: []
    }
  },
  created () {
    this.systemModel = SystemModel
    this.selectMenuModel = [SystemModel[0].key]
    if (this.menuModel !== null) { this.selectMenuModel = [this.menuModel] }
  },
  mounted () {
    document.body.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    },
    headerMenuSelect (item) {
      this.$emit('selecthead', item.key)
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
.header-animat {
  position: relative;
  z-index: 2;
  #header-menu {
    float: left;
    height: 100%;
    ul {
      height: 100%;
      li {
        border-top: 2px solid transparent;
        height: 100%;
        line-height: 64px;
      }
    }
    .ant-menu-horizontal {
      .ant-menu-item-selected,
      .ant-menu-item-active {
        border-top: 2px solid #1890ff;
        border-bottom: 2px solid transparent;
      }
    }
  }
}

.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
