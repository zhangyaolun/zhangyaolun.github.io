<template>
  <el-form class="template-msg-create-form" ref="TemplateMsgCreateFormContent" :model="TemplateCreateFormFileds"  label-width="100px">
    <el-form-item
      v-for="(item, index) in TemplateCreateFormFileds.formContent"
      :key="index"
      :prop="'formContent.' + index + '.'+ item.fieldName"
      :rules="{required: true, message: '不能为空', trigger: 'blur'}"
      :label="item.fieldDisplayName"
    >
      <el-date-picker
        v-if="/date/g.test(item.fieldName)"
        v-model="item[item.fieldName]"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-input v-else v-model="item[item.fieldName]" :placeholder="item.fieldTips"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    FormData: {
      type: Array,
      required: true
    }
  },
  watch: {
    FormData: {
      handler (val) {
        if (this.$refs.TemplateMsgCreateFormContent) {
          this.$refs.TemplateMsgCreateFormContent.clearValidate()
        }
      },
      deep: true
    },
  },
  computed: {
    TemplateCreateFormFileds () {
      let formObj = {}
      formObj.formContent = this.FormData
      return formObj
    }
  }
}
</script>

<style lang="scss">
.template-msg-create-form {
  margin-top: 20px;
  .el-form-item {
    margin-bottom: 22px !important;
  }
}
</style>
