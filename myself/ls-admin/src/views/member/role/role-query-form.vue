<template>
  <el-card class="user-query-wrap">
    <el-form :model="info" label-width="100px" ref="roleQueryForm">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="info.roleCode" placeholder="请输入角色编码" />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="info.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('roleQueryForm')">重置</el-button>
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
        roleCode: '',
        roleName: ''
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
