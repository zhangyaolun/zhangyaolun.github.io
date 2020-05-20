<template>
  <el-row class="template-msg-setting-action">
    <el-button @click="$router.push({ path: '/backend/wechat-template-msg/list' })">取 消</el-button>
    <el-button type="primary" @click="$emit('submit')">提 交</el-button>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.template-msg-setting-action {
  display: flex;
  justify-content: center;
}
</style>
