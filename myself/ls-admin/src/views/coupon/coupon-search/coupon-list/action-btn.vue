<template>
  <div class="coupon-list-action">
  </div>
</template>
<script>
export default {
  methods: {
    createClick () {
      this.$store.dispatch('coupon/setCouponData', '')
      this.$router.push({ path: '/backend/coupon/create' })
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
