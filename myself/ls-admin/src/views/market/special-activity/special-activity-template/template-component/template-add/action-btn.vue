<template>
  <div class="action-btn">
    <el-button type="primary" @click="$emit('submit')">保存</el-button>
    <el-button @click="submitFalse">取消</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    submitFalse () {
      this.$router.push({ path: '/backend/specialActivity/templatelist' })
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
