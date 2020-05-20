<template>
  <el-card class="bundle-order-table-wrap">
    <el-table :data="list" class="bundle-order-table">
      <el-table-column prop="orderNo" label="订单号" min-width="160"/>
      <el-table-column prop="orderSubList[0].cbName" label="特惠券包名称" min-width="100" />
      <el-table-column prop="orderSubList[0].cbId" label="特惠券包ID" min-width="70" />
      <el-table-column prop="mobile" label="手机号" min-width="110" />
      <el-table-column prop="userId" label="会员ID" min-width="80" />
      <el-table-column prop="totalAmt"  label="支付金额(元)" min-width="80" />
      <el-table-column prop="orderStatus" :formatter="statusFormat" label="订单状态" min-width="70" />
      <el-table-column prop="createTime" label="创建时间" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ scope.row.createTime | formatBackendTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderPayTime" label="支付时间" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.orderPayTime">{{ scope.row.orderPayTime | formatBackendTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="操作按钮" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push({ path: `/backend/on-line/gift/order/detail/${scope.row.id}` })">查看详情</el-button>
          <el-button v-if="scope.row.orderStatus == 2" type="danger" size="mini" @click="$emit('handleApplyBack', scope.row)">退款</el-button>
<!--          <el-button v-if="scope.row.orderStatus == 11" type="danger" size="mini" @click="$emit('handleOrderBack', scope.row.id)">退款</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    listQuery: {
      type: Object,
      required: true
    }
  },
  components: {
    Pagination
  },
  methods: {
    statusFormat(row, column, cellValue) {
      switch (cellValue) {
        case 1:
          return '待支付'
        case 2:
          return '已支付'
        case 3:
          return '已取消'
        case 4:
          return '已退款'
        case 5:
          return '已结算'
        case 10:
          return '支付中'
        case 11:
          return '退款中'
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bundle-order-table-wrap {
  margin: 20px;
}
</style>
