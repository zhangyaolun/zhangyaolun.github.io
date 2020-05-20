<template>
  <el-card class="box-card action-add-info">
    <el-form ref="ruleForm" :model="oData" label-width="150px" v-if="oData">
      <el-form-item label="拼团编号：">
        <span>{{oData.orderNo}}</span>
      </el-form-item>
      <el-form-item label="拼团订单编号：">
        <span>{{oData.orderSubNo}}</span>
      </el-form-item>
      <el-form-item label="拼团状态：">
        <span>{{oData.orderStatus | orderStatusFilter}}</span>
      </el-form-item>
      <el-form-item label="拼团活动名称：">
        <span>{{oData.name}}</span>
      </el-form-item>
      <el-form-item label="拼团活动ID：">
        <span>{{oData.templateId}}</span>
      </el-form-item>
      <el-form-item label="手机号：">
        <span>{{oData.mobile | mobileEncryption}}</span>
      </el-form-item>
      <el-form-item label="会员ID：">
        <span>{{oData.userId}}</span>
      </el-form-item>
      <el-form-item label="订单状态：">
        <span>{{oData.orderSubStatus | orderSubStatusFilter}}</span>
      </el-form-item>
      <el-form-item label="下单时间：">
        <span>{{oData.createTime | formatBackendTime}}</span>
      </el-form-item>
      <el-form-item label="金额：">
        <span>{{oData.amount}}</span>
      </el-form-item>
      <el-form-item label="完成时间：" v-if="oData.orderSubStatus === 'PAYED' || oData.orderSubStatus === 'REFUND'">
        <span v-if="oData.orderSubStatus == 'PAYED'">{{oData.payedTime | formatBackendTime}}</span>
        <span v-if="oData.orderSubStatus == 'REFUND'">{{oData.refundedTime | formatBackendTime}}</span>
      </el-form-item>
    </el-form>
    <slot></slot>
  </el-card>
</template>


<script>
export default {
  props: ['oData'],
  data () {
    return {
    }
  },
  filters: {
    orderStatusFilter (val) {
      let orderStatusObj = {
        'GROUPING': '拼团中',
        'SUCCESS': '拼团成功',
        'FAIL': '拼团失败'
      }
      return orderStatusObj[val]
    },
    orderSubStatusFilter (val) {
      // 拼团订单状态订单状态
      // UNPAY-待付款
      // PAYING-付款中
      // PAYED-已付款
      // SETTLED-已结算
      // REFUNDING-退款中
      // REFUND-已退款
      // CLOSED-已关闭
      // REFUNDFAILED-退款失败
      let orderSubStatusObj = {
        'UNPAY': '待付款',
        'PAYED': '已付款',
        'PAYING': '付款中',
        'CLOSED': '已关闭',
        'REFUNDING': '退款中',
        'REFUND': '已退款',
        'SETTLED': '已结算',
        'REFUNDFAILED': '退款失败'
      }
      return orderSubStatusObj[val]
    }
  }
}
</script>

<style lang="scss" scoped>
  .action-add-info{
    margin: 20px;
    .errorColor{color: #ff4949}
    .mr{margin-right: 10px !important;}
    .mr15{margin-right: 15px !important;}
    .mt{margin-top: 20px !important;}
  }
</style>
