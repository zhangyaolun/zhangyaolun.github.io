<template>
  <el-card class="reserve-purchase-list-table-wrap">
    <el-table :data="list" class="reserve-purchase-list-table">
      <el-table-column prop="orderNo" label="订单号" min-width="140" />
      <el-table-column prop="commodityName" label="商品名称" min-width="140"/>
      <el-table-column prop="commodityId" label="商品ID"/>
      <el-table-column prop="qty" label="预约总数" width="50"/>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column prop="userId" label="会员ID"/>
      <el-table-column prop="amt" label="支付金额(元)"/>
      <el-table-column prop="status" :formatter="statusFormat" label="订单状态"/>
      <el-table-column prop="payedTime" label="支付时间">
        <template slot-scope="scope">
          <span v-if="scope.row.payedTime">{{ scope.row.payedTime | formatBackendTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="提货日期">
        <template slot-scope="scope">
          <span v-if="scope.row.takeDate">{{ scope.row.takeDate | formatBackendTime('{y}-{m}-{d}') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="提货门店">
        <template slot-scope="scope">
          <span v-if="scope.row.shop"> {{ scope.row.shop.shopName  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button class="ml10" size="mini" type="primary" @click="$router.push({ path: `/backend/on-line/reserve-purchase/detail/${scope.row.id}` })">查看详情</el-button>
          <el-button class="ml10" size="mini" type="danger" v-if="scope.row.status==3" @click="$emit('handleApplyRefund', scope.row.id)">申请退款</el-button>
          <el-button class="ml10" size="mini" type="danger" v-if="scope.row.status==7" @click="$emit('handleImmediatelyRefund', scope.row.id)">退款</el-button>
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
    statusFormat (row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '删除'
        case 1:
          return '待支付'
        case 2:
          return '支付中'
        case 3:
          return '已支付'
        case 4:
          return '已取消'
        case 5:
          return '用户退款中'
        case 6:
          return '用户已退款'
        case 7:
          return '线下退款中'
        case 8:
          return '线下已退款'
        case 9:
          return '待取货'
        case 10:
          return '已取货'
        default:
          break
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.reserve-purchase-list-table-wrap {
  margin: 20px;
  .ml10{margin: 2px 5px !important;display: inline-block}
}
</style>
