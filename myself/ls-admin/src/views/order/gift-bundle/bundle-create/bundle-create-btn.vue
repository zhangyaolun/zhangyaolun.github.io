<template>
  <el-row>
    <el-button @click="$router.push({ path: '/backend/on-line/gift/bundle/index' })">取 消</el-button>
    <el-button type="primary" @click="$emit('createBundle')">保 存</el-button>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
