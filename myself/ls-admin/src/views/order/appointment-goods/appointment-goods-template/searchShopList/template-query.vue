<template>
  <el-card class="box-card">
    <el-form :model="info" label-width="130px" ref="queryForm">
      <el-form-item label="门店编号：" prop="shopCode">
        <el-input
          v-model="info.shopCode"
          placeholder="请输入门店编号"
        />
      </el-form-item>

      <el-form-item label="门店名称：" prop="shopName">
        <el-input
          v-model="info.shopName"
          placeholder="请输入门店名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('queryForm')">重置</el-button>
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
  .box-card{
    margin-bottom: 20px;
  }
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 33%;
      .el-input {
        width: 100%;
      }
      &:last-child{
        flex-basis: 100%;
      }
    }
  }
</style>
