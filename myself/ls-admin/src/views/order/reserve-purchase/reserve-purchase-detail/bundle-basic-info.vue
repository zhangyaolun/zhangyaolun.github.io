<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>券基本信息</span>
    </div>
    <el-table :data="order.userCouponList">
      <el-table-column prop="couponName" label="券名称" />
      <el-table-column prop="couponType" label="券类型" :formatter="typeFormat" />
      <el-table-column prop="id" label="券号" />
      <el-table-column prop="useCondition" label="券状态" :formatter="useConditionFormat" />
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
    typeFormat (row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '普通优惠券'
        case 1:
          return '积分商品兑换券'
        case 2:
          return '微信红包优惠券'
        case 10:
          return '预约购买'
        case 11:
          return '特惠券包'
        default:
          break
      }
    },
    useConditionFormat (row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '未使用'
        case 1:
          return '开始使用'
        case 2:
          return '已使用'
        default:
          break
      }
    }
  }
}
</script>
