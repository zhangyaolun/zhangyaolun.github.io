<template>
  <el-form class="template-msg-detail-form" label-width="120px">
    <el-form-item v-for="(item, index) in TemplateMsgDetail" :key="index" :label="`${item.fieldDisplayName}：`">
      <span>{{ item[item.fieldName] }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    TemplateMsgDetail: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.template-msg-detail-form {
  margin-top: 20px;
  border: 1px solid #ececec;
  .el-form-item {
    margin-bottom: 22px !important;
  }
}
</style>
