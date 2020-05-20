<template>
  <div class="action-btn">
    <el-button @click="submitFalse">返回</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    submitFalse () {
      this.$router.push({ path: '/backend/commodity/templatelist' })
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
