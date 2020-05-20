<template>
  <el-card class="box-card action-add-info">
    <el-form ref="ruleForm" :model="oData" label-width="150px" v-if="oData">
      <el-form-item label="订单编号：">
        <span>{{oData.orderNo}}</span>
      </el-form-item>
      <el-form-item label="订单来源：">
        <span v-if="oData.orderPlatform === 'MINA'">小程序</span>
        <span v-if="oData.orderPlatform === 'APP'">app</span>
      </el-form-item>
      <el-form-item label="商品名称：">
        <span>{{oData.orderItemList[0].name}}</span>
      </el-form-item>
      <el-form-item label="商品ID：">
        <span>{{oData.orderItemList[0].commodityId}}</span>
      </el-form-item>
      <el-form-item label="商品件数：">
        <span>{{oData.orderItemList[0].quantity}}</span>
      </el-form-item>
      <el-form-item label="手机号：">
        <span>{{oData.mobile}}</span>
      </el-form-item>
      <el-form-item label="会员ID：">
        <span>{{oData.userId}}</span>
      </el-form-item>
      <el-form-item label="订单总金额：">
        <span>{{oData.payment}}</span>
      </el-form-item>
      <el-form-item label="支付金额：">
        <span>{{oData.payment}}</span>
      </el-form-item>
      <el-form-item label="下单时间：">
        <span>{{oData.createTime | formatBackendTime}}</span>
      </el-form-item>
      <el-form-item label="支付方式：">
        <span v-if="oData.paymentType === 'MINA'">小程序</span>
        <span v-if="oData.paymentType === 'WECHAT'">微信支付</span>
        <span v-if="oData.paymentType === 'ALIPAY'">支付宝支付</span>
      </el-form-item>
      <el-form-item label="支付流水号：">
        <span>{{oData.serialNumber}}</span>
      </el-form-item>
      <el-form-item label="支付时间：">
        <span>{{oData.paymentTime | formatBackendTime}}</span>
      </el-form-item>
      <el-form-item label="订单状态：">
        <span>{{oData.status | orderStatusFilter}}</span>
      </el-form-item>
      <el-form-item label="收货人："><span>{{oData.receiverName}}</span></el-form-item>
      <el-form-item label="收货人联系方式："><span>{{oData.receiverMobile}}</span></el-form-item>
      <el-form-item label="收货人地址："><span>{{oData.receiverAddress}}</span></el-form-item>
    </el-form>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: ['oData'],
  filters: {
    orderStatusFilter (val) {
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
