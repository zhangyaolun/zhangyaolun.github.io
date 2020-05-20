<template>
  <div class="role-list-dialog">
    <el-form :inline="true" :model="roleInfo" ref="roleQueryForm">
      <el-form-item label="角色编码">
        <el-input v-model="roleInfo.roleCode" placeholder="请输入角色编码" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('roleQueryForm')">重置</el-button>
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
        roleCode: ''
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
