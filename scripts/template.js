// template.js
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
    <div class="${compoenntName}">
      ${compoenntName}组件
    </div>
  </template>
  <script>
  export default {
    name: '${compoenntName}'
  }
  </script>
  <style lang="less" scoped>
  </style>
  `
  },
  entryTemplate: compoenntName => {
    return `import ${compoenntName} from './${compoenntName}.vue'
    export default ${compoenntName}`
  }
}
