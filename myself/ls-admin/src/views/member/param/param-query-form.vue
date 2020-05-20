<template>
  <el-card class="user-query-wrap">
    <el-form :model="info" label-width="100px" ref="paramQueryForm">
      <el-form-item label="参数名称" prop="conParamName">
        <el-input v-model="info.conParamName" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="参数类型" prop="conParamType">
        <el-select v-model="info.conParamType" clearable  placeholder="请选择参数类型" style="width:50%">
          <el-option
            v-for="item in paramLevelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父级参数编码" prop="superParamCode">
        <el-input v-model="info.superParamCode" placeholder="请输入父级参数编码" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('paramQueryForm')">重置</el-button>
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
      },
      paramLevelList: [{
          value: 0,
          label: '一级参数'
      },
      {
          value: 1,
          label: '二级参数'
      }],
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
