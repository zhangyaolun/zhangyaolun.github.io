<template>
  <div class="role-list-dialog">
    <el-form :inline="true" :model="roleInfo" ref="userRoleQueryForm">
      <el-form-item label="角色名">
        <el-input v-model="roleInfo.roleName" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('userRoleQueryForm')">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleInfo: {
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
      this.$emit('query', this.roleInfo)
    }
  }
}
</script>

<style>

</style>
