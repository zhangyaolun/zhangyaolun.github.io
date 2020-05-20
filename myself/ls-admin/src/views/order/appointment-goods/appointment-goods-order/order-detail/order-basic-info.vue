<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>订单基本信息</span>
    </div>
     <el-form :model="order" label-width="120px" class="detailLabelColor">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号：">
            {{order.orderNo}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付状态：">
            <el-tag type="danger" v-if="order.orderStatus == 'WAITING_PAY'">待支付</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 'HAS_PAYED'">已支付</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 'HAS_CANCEL'">已取消</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="售后状态：">
            <el-tag type="danger" v-if="order.afterSaleStatus == 'WAITING_SENDING'">待发送</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'WAITING_CONFIRM'">待确认</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'WAITING_PICK'">待取货</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'HAS_REFUND'">已退款</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'REFUND_DOING'">退款中</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'HAS_PICK'">已取货</el-tag>
            <el-tag type="danger" v-if="order.afterSaleStatus == 'HAS_EXPIRED'">已过期</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付金额(元)：">
            {{order.amt}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="创建时间：">
            {{order.createTime | formatBackendTime}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付时间：">
            <span v-if="order.payedTime !=null">{{order.payedTime | formatBackendTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
