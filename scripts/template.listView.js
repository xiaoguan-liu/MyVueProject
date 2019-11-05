// template.js
module.exports = {
  vueListTemplate: compoenntName => {
    const compoenntNameToLower = compoenntName.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
      return $1.toLowerCase() + $2
    })
    return `<template>
    <list-layout
      :refresh="()=>this.$refs.table.refresh()"
      :search="()=>this.$refs.table.refresh(true)"
      :reSearch="() => queryParam = {}"
      :addData="handleAdd"
      :deleteData="handleDelete"
    >
      <template #search>
        
      </template>
      <template #advancedSearch>
        
      </template>
  
      <s-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="false"
        :showPagination="true"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">修改</a>
          </template>
        </span>
      </s-table>
    </list-layout>
  </template>
  
  <script>
  import { STable } from '@/components'
  import ListLayout from '@layouts/ListLayout'
  import notification from 'ant-design-vue/es/notification'
  import { seach${compoenntName}, delete${compoenntName} } from '@/api/${compoenntNameToLower}'
  
  export default {
    name: '${compoenntName}',
    components: {
      STable,
      ListLayout
    },
    data () {
      return {
        mdl: {},
        BoolSelectItem,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // console.log('loadData.parameter', parameter)
          return seach${compoenntName}(Object.assign(parameter, this.queryParam))
            .then(result => {
              return result
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      handleAdd () {
        this.$router.push({ name: '${compoenntNameToLower}Edit', query: { id: null } })
      },
      handleDetail (record) {
        this.$router.push({ name: '${compoenntNameToLower}Edit', query: { id: record.id } })
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      handleDelete () {
        if (this.selectedRowKeys.length > 0) {
          delete${compoenntName}(this.selectedRowKeys).then(result => {
            notification.success({
              message: '删除成功',
              description: '数据规则删除成功!'
            })
            this.$refs.table.refresh(true)
          })
        } else {
          notification.warning({
            message: '未删除数据',
            description: '请选中需要删除的数据!'
          })
        }
      }
    }
  }
  </script>  
  <style lang="less" scoped>
  </style>
  `
  },
  vueEditTemplate: compoenntName => {
    const compoenntNameToLower = compoenntName.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
      return $1.toLowerCase() + $2
    })
    return `<template>
    <edit-layout
      :submit="handleSubmit"
      :loading="loading"
      :buttonLoading="buttonLoading"
      ref="formData">

    </edit-layout>
  </template>
  
  <script>
  import EditLayout from '@layouts/EditLayout'
  import notification from 'ant-design-vue/es/notification'
  import { add${compoenntName}, updata${compoenntName}, get${compoenntName} } from '@/api/${compoenntNameToLower}'
  
  export default {
    name: '${compoenntName}Edit',
    components: {
      EditLayout
    },
    data () {
      return {
        loading: false,
        buttonLoading: false
      }
    },
    created () {
      if (this.$route.query.id) {
        this.loading = true
        get${compoenntName}(this.$route.query.id).then(result => {
          // console.log(result)
          this.$nextTick(() => {
            // 必须按照表单的数据结构传值,多传和少传均会报错 示例:{ enName: result.enName }
            this.$refs.formData.form.setFieldsValue({ })
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    methods: {
      handleSubmit (e) {
        this.buttonLoading = true
        e.preventDefault()
        this.$refs.formData.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values)
            if (this.$route.query.id) {
              updata${compoenntName}(values).then(result => {
                notification.success({
                  message: '修改成功',
                  description: 'xx修改成功!'
                })
                this.$router.go(-1)
              }).finally(() => {
                this.buttonLoading = false
              })
            } else {
              add${compoenntName}(values).then(result => {
                notification.success({
                  message: '添加成功',
                  description: 'xx添加成功!'
                })
                this.$router.go(-1)
              }).finally(() => {
                this.buttonLoading = false
              })
            }
          }
        })
      }
    }
  }
  </script>  
  <style lang="less" scoped>
  </style>
  `
  }
}
