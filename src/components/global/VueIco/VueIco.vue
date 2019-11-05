<template>
  <div class="banner">
    <img alt="Vue logo" style="width: 64px; height: 64px" src="@/assets/logo.png">
    <h3 style="margin-top: 1rem">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'VueIco',
  props: {
    title: {
      type: String,
      default: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
    text-align: center;
    padding: 25px 0;
    margin: 25px 0;
}
</style>
