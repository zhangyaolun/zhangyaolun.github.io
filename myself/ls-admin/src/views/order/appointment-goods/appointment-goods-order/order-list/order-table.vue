<template>
  <el-table
    ref="dialogTable"
    :data="table"
  >
    <el-table-column prop="subOrderNo" label="子订单号" width="200" />
    <el-table-column prop="commodityCd" label="货号" width="100" />
    <el-table-column prop="commodityName" label="商品名称" min-width="100" />
    <el-table-column prop="qty" label="数量" width="110" />
  </el-table>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      required: true
    }
  }
}
</script>
