<template>

  <el-card class="box-card">
    <el-form :model="info" label-width="130px" ref="listQueryForm">
      <el-form-item label="商户名称：" prop="merchantName">
        <el-input
          v-model="info.merchantName"
          placeholder="请输入商户名称"
        />
      </el-form-item>
      <el-form-item label="商户号：" prop="merchantNumber">
        <el-input
          v-model="info.merchantNumber"
          placeholder="请输入商户号"
        />
      </el-form-item>
      <el-form-item label="关联用户账号：" prop="userName">
        <el-input
          v-model="info.userName"
          placeholder="请输入关联用户账号"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="reset('listQueryForm')">重置</el-button>
        <el-button type="primary" @click="queryList">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .placeholder{
    margin-left: 10px;
    display: block;
    color: #909399;
    font-size: 12px;
  }
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 33%;

    }
  }
</style>
