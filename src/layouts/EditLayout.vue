<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-spin :spinning="loading">
      <a-form @submit="submit" :form="form">
        <a-form-item style="margin-bottom: 0px;">
          <slot></slot>
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <slot name="buttonList">
            <a-button htmlType="submit" :loading="buttonLoading" type="primary">提交</a-button>
            <a-button style="margin-left: 8px" @click="$router.go(-1)">退回</a-button>
          </slot>
        </a-form-item>
      </a-form>
    </a-spin>

  </a-card>
</template>

<script>

export default {
  name: 'EditLayout',
  props: {
    // 必须绑定提交事件
    submit: {
      type: Function,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    buttonLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  }
}
</script>

<style scoped>

</style>
