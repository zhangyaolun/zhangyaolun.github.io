<template>
  <div class="list-action">
    <el-row>
      <el-button class="right mr15" type="primary" @click="$emit('creat', { id: '' })">自定义客群</el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.list-action{
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
