<template>
  <el-card class="menu-query-wrap">
    <el-form :model="info" label-width="100px" ref="menuQueryForm">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="info.menuName" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="上级模块编码" prop="modelName">
        <el-input v-model="info.modelName" placeholder="请输入上级模块编码" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('menuQueryForm')">重置</el-button>
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
        menuName: '',
        modelName: ''
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
  .menu-query-wrap {
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
