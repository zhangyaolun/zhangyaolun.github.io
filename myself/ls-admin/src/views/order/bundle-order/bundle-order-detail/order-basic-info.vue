<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>订单基本信息</span>
    </div>
    <el-form :model="order" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号：">
            <el-input v-model="order.orderNo" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态：">
            <el-tag type="danger" v-if="order.orderStatus == 1">待支付</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 2">已支付</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 3">已取消</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 4">已退款</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 5">已结算</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 10">支付中</el-tag>
            <el-tag type="danger" v-if="order.orderStatus == 11">退款中</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付金额(元)：">
            <el-input v-model="order.totalAmt" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建时间：">
            <el-date-picker
              type="datetime"
              v-model="order.createTime"
              style="width: 100%;"
              readonly
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付时间：">
            <el-date-picker
              type="datetime"
              v-model="order.orderPayTime"
              style="width: 100%;"
              readonly
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单流量来源：">
            <el-input v-model="order.flowSource" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下单平台/渠道：">
            <el-input v-model="order.platform" :disabled="true"></el-input>
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
