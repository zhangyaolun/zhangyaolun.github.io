<template>
  <div class="action-btn">
    <el-button @click="$router.push({ path: '/backend/appointmentGoods/orderlist' })">返 回</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.action-btn {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
