<template>
  <div class="coupon-list-action">
    <el-row>
      <el-button class="right mr15" type="primary" @click="$emit('add')">新建</el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
  .coupon-list-action{

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
