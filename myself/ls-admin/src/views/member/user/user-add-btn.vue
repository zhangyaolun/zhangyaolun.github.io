<template>
  <div class="user-add-btn-wrap">
    <el-button type="primary" @click="$emit('add')">新建</el-button>
  </div>
</template>

<style lang="scss" scoped>
.user-add-btn-wrap {
  margin-left: 20px;
}
</style>
