<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>订单基本信息</span>
    </div>
     <el-form :model="order" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号：">
            {{order.orderNo}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态：">
            <el-tag type="danger" v-if="order.status == 1">待支付</el-tag>
            <el-tag type="danger" v-if="order.status == 2">支付中</el-tag>
            <el-tag type="danger" v-if="order.status == 3">已支付</el-tag>
            <el-tag type="danger" v-if="order.status == 4">已取消</el-tag>
            <el-tag type="danger" v-if="order.status == 5">用户退款中</el-tag>
            <el-tag type="danger" v-if="order.status == 6">用户已退款</el-tag>
            <el-tag type="danger" v-if="order.status == 7">线下退款中</el-tag>
            <el-tag type="danger" v-if="order.status == 8">线下已退款</el-tag>
            <el-tag type="danger" v-if="order.status == 9">待取货</el-tag>
            <el-tag type="danger" v-if="order.status == 10">已取货</el-tag>
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
