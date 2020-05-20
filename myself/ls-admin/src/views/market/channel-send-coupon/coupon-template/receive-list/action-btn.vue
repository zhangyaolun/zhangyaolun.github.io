<template>
  <div class="list-action">
    <el-row>
      <el-button class="right mr15" type="primary" @click="$emit('exportClick')">导出</el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.list-action{

  margin-bottom: 20px;
  margin-top: 10px;
  .right{
    float: right;
  }
  .mr15{
    margin-right: 15px;
  }
}
</style>
