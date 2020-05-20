<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>预约商品基本信息</span>
    </div>
    <el-form :model="order" label-width="180px">
      <el-row style="margin-top: 10px;">
        <el-col :span="8">
          <el-form-item label="预约商品ID：">
            <span v-text="order.commodityId" :disabled="true"></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预约商品名称：">
            <span v-text="order.commodityName" :disabled="true"></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预约总件数：">
          <span v-text="order.qty" :disabled="true"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约商品展示有效期：">
             <span>{{order.canShowStart |formatBackendTime}}   至   </span>
             <span>{{order.canShowEnd |formatBackendTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约商品支付有效期：">
            <span>{{order.canOrderStart |formatBackendTime}}   至   </span>
             <span>{{order.canOrderEnd |formatBackendTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预约商品提货日期：">
            <span v-if="order.takeDate != null">{{order.takeDate |formatBackendTime('{y}-{m}-{d}')}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预约商品提货门店：">
            <span v-if="order.shop" v-text="order.shop.shopName" :disabled="true"></span>
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

<style lang="scss">
.order-basic-info {
  margin: 20px;
  .el-form-item__content {
    width: 50%;
  }
}
</style>
