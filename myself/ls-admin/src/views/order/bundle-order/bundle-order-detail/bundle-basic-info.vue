<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>特惠券包基本信息</span>
    </div>
    <el-form :model="order" label-width="180px">
      <el-form-item label="特惠券包ID：">
        <el-input v-model="order.orderSubList[0].cbId" readonly />
      </el-form-item>
      <el-form-item label="特惠券包名称：">
        <el-input v-model="order.orderSubList[0].cbName" readonly />
      </el-form-item>
      <el-form-item label="特惠券包展示有效期：">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            v-model="order.orderSubList[0].couponBundle.showTime"
            readonly
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
              type="datetime"
              v-model="order.orderSubList[0].couponBundle.finishTime"
              readonly
            />
        </el-col>
      </el-form-item>
      <el-form-item label="特惠券包支付有效期：">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            v-model="order.orderSubList[0].couponBundle.orderTime"
            readonly
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            v-model="order.orderSubList[0].couponBundle.finishTime"
            readonly
          />
        </el-col>
      </el-form-item>
      <el-form-item label="特惠券包规则说明：">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="order.orderSubList[0].couponBundle.description"
          readonly
        />
      </el-form-item>
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

<style lang="scss">
.order-basic-info {
  margin: 20px;
  .el-form-item__content {
    width: 50%;
  }
}
</style>
