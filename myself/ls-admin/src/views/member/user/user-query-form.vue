<template>
  <el-card class="user-query-wrap">
    <el-form :model="info" label-width="100px" ref="userQueryForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="info.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="info.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('userQueryForm')">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      info: {
        userName: '',
        phone: ''
      }
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    query () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-query-wrap {
    margin: 20px;
    .el-form{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      .el-form-item {
        flex-basis: 50%;
        .el-input{
          width: 70%;
        }
      }
    }
  }
</style>
