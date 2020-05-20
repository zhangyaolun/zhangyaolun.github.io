<template>
  <div class="action-btn">
    <el-button type="primary" @click="$emit('submit')">确认</el-button>
    <el-button @click="submitFalse">取消</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerPath: ''
    }
  },
  mounted () {
    this.routerPath = window.location.href.split('#')[1]
  },
  methods: {
    submitFalse () {
      this.$store.dispatch('coupon/removeCouponData')
      this.$router.push({ path: '/backend/coupon/list/index' })
    }
  }
}

</script>
<style lang="scss" scoped>
.action-btn {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>
