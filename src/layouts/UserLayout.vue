<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="navbar">
      <div class="navbar-logo">
        <a href="/cn/index">
          <img src="/images/logo.png">
        </a>
      </div>
      <div class="navbar-links">
        <span v-if="device=='desktop'">没有帐号？立即注册</span>
        <router-link class="navbar-btn" :to="{ name: 'register' }">创建帐户</router-link>
        <a href="/cn/index" class="navbar-btn">
          <a-icon theme="filled" type="home"/>
        </a>
      </div>
    </div>
    <div class="container">
      <div v-if="device=='desktop'">
        <img :src="loginImage" class="pull-right">
      </div>
      <route-view></route-view>
    </div>
    <global-footer style="margin-top:150px;"/>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  name: 'UserLayout',
  components: { RouteView, GlobalFooter },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  computed: {
    loginImage: function () {
      const random = Math.ceil(Math.random() * 4)
      return `/images/login/${random}.png`
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 71px;
  border-bottom: 1px solid #eee !important;
  overflow: hidden;
  padding: 0 30px;
  border-width: 0;
  min-height: 28px;
  background: #f4f4f4 !important;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: space-between;
  &-logo {
    margin-top: 20px;
    display: inline-block;
    height: 39px;
    margin-left: 0;
    img {
      width: 137px;
    }
  }
  &-links {
    height: 70px;
    line-height: 70px;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    a,
    span {
      margin: 0 5px;
      text-decoration: none;
    }
  }
  &-btn {
    display: inline-block;
    color: #fff !important;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25) !important;
    background-image: none !important;
    border: 5px solid #fff;
    border-radius: 0;
    box-shadow: none !important;
    -webkit-transition: all ease 0.15s;
    -o-transition: all ease 0.15s;
    transition: all ease 0.15s;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
    position: relative;
    border-width: 4px;
    font-size: 13px;
    padding: 4px 9px;
    height: 34px;
    line-height: 18px;
    background-color: #d15b47 !important;
    border-color: #d15b47;
  }
  &-btn:hover {
    background-color:#aa4434!important;border-color:#c4513e
  }
}

#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  &.desktop{
    .container {
       width: 1160px;
    }
  }

  .container {
    width: 100%;
    background-size: 100%;
    padding: 50px 0 0 0;
    position: relative;
    display: -webkit-flex; /* Safari */
    display: flex;
    margin:0 auto;
    a {
      text-decoration: none;
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}
</style>
