<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <slot name="search"></slot>
          <template v-if="advanced">
            <slot name="advancedSearch"></slot>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button v-if="search" type="primary" @click="search">查询</a-button>
              <a-button v-if="reSearch" style="margin-left: 8px" @click="reSearch">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <slot name="buttonList">
      <div v-if="addData||deleteData" class="table-operator">
        <a-button v-if="addData" type="primary" icon="plus" @click="addData">添加</a-button>
        <a-button v-if="deleteData" type="danger" icon="delete" @click="handleDelete">删除</a-button>
      </div>
    </slot>
    <slot>

    </slot>
  </a-card>
</template>

<script>
import Modal from 'ant-design-vue/es/modal'

export default {
  name: 'ListLayout',
  props: {
    // 查询
    search: {
      type: Function,
      default: null
    },
    // 重置查询项
    reSearch: {
      type: Function,
      default: null
    },
    // 刷新
    refresh: {
      type: Function,
      default: null
    },
    // 添加
    addData: {
      type: Function,
      default: null
    },
    // 删除
    deleteData: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      isFirstEnter: false // 是否第一次进入，默认false
    }
  },
  created () {
    this.isFirstEnter = true
    // 只有回退刷新后才会执行activated钩子函数
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleDelete () {
      Modal.confirm({
        title: '删除确认',
        content: '你确定删除选中的数据么?',
        onOk: () => this.deleteData()
      })
    }
  },
  activated () {
    if (this.$route.meta.isBack && !this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      if (this.refresh) {
        this.refresh()
      }
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false
  }
}
</script>

<style scoped>

</style>
