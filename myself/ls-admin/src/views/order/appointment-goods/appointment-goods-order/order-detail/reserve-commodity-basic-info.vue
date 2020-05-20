<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>预约商品基本信息</span>
    </div>
    <el-form :model="order" label-width="180px" class="detailLabelColor">
      <el-row class="subOrderTable">
        <el-col :span="24">
          <order-table :table="order.subOrderList"></order-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约商品展示有效期：">
             {{order.canShowStart |formatBackendTime}}<span class="color999"> 至 </span>
             {{order.canShowEnd |formatBackendTime}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约商品支付有效期：">
            {{order.canOrderStart |formatBackendTime}}<span class="color999"> 至 </span>
            {{order.canOrderEnd |formatBackendTime}}
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
import orderTable from '../order-list/order-table'
export default {
  components: {
    orderTable
  },
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
  .subOrderTable{
    margin-bottom: 20px;
    padding-bottom: 40px;
    border-bottom: 1px dashed #ccc;
  }
  .color999{color: #999}
  .el-form-item__content {
    width: 50%;
  }
}
</style>
