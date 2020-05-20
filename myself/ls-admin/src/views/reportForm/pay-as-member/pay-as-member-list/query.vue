<template>

  <el-card class="box-card coupon-query">
    <el-form :model="info" :rules="rules" label-width="120px" ref="CouponListQueryForm">
      <el-form-item label="交易记录时间：">
        <el-date-picker v-model="info.reportDate" format="yyyy-MM" type="month" value-format="timestamp" placeholder="请选择交易记录时间" />
        <span class="promptingError">*每月3日可查询并下载上个月的数据文件</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('CouponListQueryForm')">重置</el-button>
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
  data () {
    return {
      rules: {
        couponId: [{ required: true, message: '请输入优惠券ID', trigger: 'blur' }]
      }
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.reportDate = ''
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
.coupon-query{
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 100%;
      .el-input {
        width: 33%;
      }
      .el-select {
        width: 33%;
      }
      &:nth-child(3) .el-radio-group{
        width: 100%;
      }
      &:nth-child(4) .el-input{
        width: 100%;
      }
      .line{
        text-align: center;
      }
    }
  }
}
</style>
