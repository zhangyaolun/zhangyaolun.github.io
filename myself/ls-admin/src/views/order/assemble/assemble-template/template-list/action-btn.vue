<template>
  <div class="coupon-list-action">
    <el-row>
      <el-button class="right mr15" type="primary" @click="createClick">新建</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    createClick () {
      this.$router.push({ path: '/backend/assemble/templatecreate' })
    }
  }
}
</script>
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
