<template>
  <div class="brand-action">
    <el-row>
      <el-button type="primary" @click="$emit('comfirm')">确定</el-button>
<!--      <el-button plain @click="$emit('cancle')">取消</el-button>-->
    </el-row>
  </div>
</template>

<script>
export default {
  props: {

  }
}
</script>

<style lang="scss" scoped>
.brand-action{
  margin: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
