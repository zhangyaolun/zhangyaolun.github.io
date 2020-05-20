<template>
  <el-card class="box-card">
    <el-form :model="info" label-width="130px" ref="queryForm">
      <el-form-item label="商品名称：" prop="name">
        <el-input
          v-model="info.name"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item label="商品ID：" prop="commodityId">
        <el-input
          v-model="info.commodityId"
          placeholder="请输入商品ID"
        />
      </el-form-item>
      <el-form-item label="订单编号：" prop="orderNo">
        <el-input
          v-model="info.orderNo"
          placeholder="请输入订单编号"
        />
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="info.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>

      <el-form-item label="会员ID：" prop="userId">
        <el-input
          v-model="info.userId"
          placeholder="请输入会员ID"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="info.status" placeholder="请选择"  >
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="block" label="下单时间：" prop="from_time">
        <el-col :span="11">
          <el-date-picker v-model="info.payStartTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime()" />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="info.payEndTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime()" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('queryForm')">重置</el-button>
        <el-button type="primary" @click="queryList">查询</el-button>
        <el-button @click="exportClick">导出查询结果</el-button>
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
      orderStatusOptions: [
        { label: '全部', value: '' },
        { label: '待付款', value: 'UNPAY' },
        { label: '付款中', value: 'PAYING' },
        { label: '已付款', value: 'PAYED' },
        { label: '已关闭', value: 'CLOSED' },
        { label: '已结算', value: 'SETTLED' },
        { label: '退款失败', value: 'REFUNDFAILED' },
        { label: '退款中', value: 'REFUNDING' },
        { label: '已退款', value: 'REFUND' }
      ]
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.payEndTime) {
        if (value > this.info.payEndTime) {
          this.info.payStartTime = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.payStartTime) {
        if (value < this.info.payStartTime) {
          this.info.payEndTime = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (this.info.payStartTime && !this.info.payEndTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.payStartTime && this.info.payEndTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
    },
    exportClick () {
      if (!this.info.payStartTime && !this.info.payEndTime) {
        this.$message.error('请选择下单时间')
        return false
      }
      if (this.info.payStartTime && !this.info.payEndTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.payStartTime && this.info.payEndTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      // if ((this.info.payStartTime - this.info.payEndTime) > 2678400000) {
      //   this.$message.error('最大导出数量为31天，请调整后重试')
      //   return false
      // }
      this.$emit('exportQuery', this.info)
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
      margin-bottom: 12px;
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      &:nth-last-child(1), &:nth-last-child(2){
        flex-basis: 66%;
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100%;
        }
        .line{
          text-align: center;
        }
      }
      &:last-child{
        flex-basis: 100%;
      }
    }
  }
</style>
