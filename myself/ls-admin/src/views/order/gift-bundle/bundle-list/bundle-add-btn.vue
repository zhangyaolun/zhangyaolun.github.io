<template>
  <div class="gift-add-btn-wrap">
    <el-button type="primary" @click="$emit('handleCreate')">新建</el-button>
  </div>
</template>

<style lang="scss" scoped>
.gift-add-btn-wrap {
  margin-left: 20px;
}
</style>
