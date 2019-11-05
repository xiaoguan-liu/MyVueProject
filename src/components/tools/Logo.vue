<template>
  <div class="logo" :style="showTitle?'':'padding-left: 17.5px;'">
    <router-link :to="{name:'home'}">
      
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
