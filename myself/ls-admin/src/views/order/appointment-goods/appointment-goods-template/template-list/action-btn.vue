<template>
  <div class="list-action">
    <el-row>
      <el-button class="right mr15" type="primary" @click="$emit('createClick')">新建</el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.list-action{
  margin-top: 10px;
  margin-bottom: 20px;
  .right{
    float: right;
  }
  .mr15{
    margin-right: 15px;
  }
}
</style>
