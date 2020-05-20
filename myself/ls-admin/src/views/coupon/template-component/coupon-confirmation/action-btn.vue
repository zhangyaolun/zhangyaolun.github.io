<template>
  <div class="action-btn">
    <el-button type="primary" @click="$emit('submit','true')">{{title}}</el-button>
    <el-button @click="$emit('submit','false')">取消</el-button>
  </div>
</template>
<script>
export default {
  props: ['copyType'],
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    this.copyType ? this.title = '创建' : this.title = '确定'
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

