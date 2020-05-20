<template>
  <el-card class="box-card">
    <el-form :model="info" label-width="130px" ref="queryForm">
      <el-form-item label="会员卡号：" prop="barcode">
        <el-input
          v-model="info.barcode"
          placeholder="请输入会员卡号"
        />
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="info.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="UserID：" prop="userId">
        <el-input
          v-model="info.userId"
          placeholder="请输入UserID"
        />
      </el-form-item>
      <el-form-item label="商品显示名称：" prop="commodityName">
        <el-input
          v-model="info.commodityName"
          placeholder="请输入商品显示名称"
        />
      </el-form-item>

      <el-form-item label="商品货号：" prop="commodityCd">
        <el-input
          v-model="info.commodityCd"
          placeholder="请输入商品货号"
        />
      </el-form-item>
      <el-form-item label="支付状态：" prop="orderStatus">
        <el-select v-model="info.orderStatus" placeholder="请选择"  >
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="门店名称：" prop="shopName">
        <el-input
          v-model="info.shopName"
          placeholder="请输入门店名称"
        />
      </el-form-item>

      <el-form-item label="门店ID：" prop="shopId">
        <el-input
          v-model="info.shopId"
          placeholder="请输入门店ID"
        />
      </el-form-item>
      <el-form-item label="售后状态：" prop="status">
        <el-select v-model="info.afterSaleStatus" placeholder="请选择"  >
          <el-option
            v-for="item in afterSaleStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="block" label="提货日期：" prop="takeTimeStart">
        <el-col :span="11">
          <el-date-picker v-model="info.takeTimeStart" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('takeTimeStart', 'takeTimeEnd')" />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="info.takeTimeEnd" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('takeTimeStart', 'takeTimeEnd')" />
        </el-col>
      </el-form-item>
      <el-form-item class="block" label="支付日期：" prop="from_time">
        <el-col :span="11">
          <el-date-picker v-model="info.payedTimeStart" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('payedTimeStart', 'payedTimeEnd')" />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="info.payedTimeEnd" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('payedTimeStart', 'payedTimeEnd')" />
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
        { label: '待支付', value: 'WAITING_PAY' },
        { label: '已支付', value: 'HAS_PAYED' },
        { label: '已取消', value: 'HAS_CANCEL' }
      ],
      afterSaleStatusOptions: [
        { label: '全部', value: '' },
        { label: '待发送', value: 'WAITING_SENDING' },
        { label: '待确认', value: 'WAITING_CONFIRM' },
        { label: '待取货', value: 'WAITING_PICK' },
        { label: '已退款', value: 'HAS_REFUND' },
        { label: '退款中', value: 'REFUND_DOING' },
        { label: '已取货', value: 'HAS_PICK' },
        { label: '已过期', value: 'HAS_EXPIRED' }
      ]
    }
  },
  methods: {
    changeStartTime (start, end) {
      if (this.info[end]) {
        if (this.info[start] > this.info[end]) {
          this.info[start] = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (start, end) {
      if (this.info[start]) {
        if (this.info[end] && this.info[end] < this.info[start]) {
          this.info[end] = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (this.info.takeTimeStart && !this.info.takeTimeEnd) {
        this.$message.error('请选择提货日期结束时间')
        return false
      }
      if (!this.info.takeTimeStart && this.info.takeTimeEnd) {
        this.$message.error('请选择提货日期开始时间')
        return false
      }
      if (this.info.payedTimeStart && !this.info.payedTimeEnd) {
        this.$message.error('请选择支付日期结束时间')
        return false
      }
      if (!this.info.payedTimeStart && this.info.payedTimeEnd) {
        this.$message.error('请选择支付日期开始时间')
        return false
      }
      this.$emit('query', this.info)
    },
    exportClick () {
      if (!this.info.payedTimeStart && !this.info.payedTimeEnd) {
        this.$message.error('请选择支付日期')
        return false
      }
      if (this.info.payedTimeStart && !this.info.payedTimeEnd) {
        this.$message.error('请选择支付日期结束时间')
        return false
      }
      if (!this.info.payedTimeStart && this.info.payedTimeEnd) {
        this.$message.error('请选择支付日期开始时间')
        return false
      }
      if ((this.info.payedTimeEnd - this.info.payedTimeStart) > 2678400000) {
        this.$message.error('最大导出数量为31天，请调整后重试')
        return false
      }
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
      &:nth-last-child(2), &:nth-last-child(3){
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
