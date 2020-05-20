<template>
  <div class="brand-action">
    <el-row>
      <el-button type="primary" @click="$emit('comfirm')">确定</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.brand-action{
  margin: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
