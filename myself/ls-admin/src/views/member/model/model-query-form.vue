<template>
  <el-card class="model-query-wrap">
    <el-form :model="info" label-width="100px" ref="modelQueryForm">
      <el-form-item label="模块名称" prop="modelName">
        <el-input v-model="info.modelName" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="模块等级" prop="modelLevel">
        <el-input v-model="info.modelLevel" placeholder="请输入上级模块编码" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('modelQueryForm')">重置</el-button>
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
        modelName: '',
        modelLevel: ''
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
  .model-query-wrap {
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
