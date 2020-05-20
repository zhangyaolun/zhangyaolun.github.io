<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>绑定券明细</span>
    </div>
    <el-table :data="order.orderSubList[0].orderSubCouponList">
      <el-table-column prop="couponId" label="券编号" min-width="100" />
      <el-table-column prop="couponName" label="券名称" min-width="200" />
      <el-table-column prop="type" label="券类型" :formatter="typeFormat" min-width="120" />
      <el-table-column prop="originalPrice" label="券/张卖价(元)" min-width="120" />
      <el-table-column prop="bindNum" label="绑定券数量" min-width="100" />
      <el-table-column prop="usedNum" label="使用券数量" min-width="100" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    typeFormat(row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '会员优惠券'
        case 1:
          return '免费券'
        case 2:
          return '满减优惠券'
        case 3:
          return '商品立减券'
        default:
          break
      }
    }
  }
}
</script>
