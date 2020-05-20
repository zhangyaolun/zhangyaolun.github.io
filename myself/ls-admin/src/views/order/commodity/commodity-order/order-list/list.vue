<template>
  <el-card class="list-table">
    <el-table
      :data="tableData"
      :fit="true"
    >
      <el-table-column prop="orderNo" label="订单编号"/>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          {{scope.row.orderItemList[0].name}}
        </template>
      </el-table-column>
      <el-table-column label="商品ID">
        <template slot-scope="scope">
          {{scope.row.orderItemList[0].commodityId}}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column prop="userId" label="会员ID"/>
      <el-table-column label="下单时间" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatBackendTime('{y}/{m}/{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payment" label="支付金额(元)"/>
      <el-table-column label="支付状态" min-width="100">
        <template slot-scope="scope">
          {{scope.row.status | orderStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="ml10" @click="$router.push({ path: `/backend/commodity/orderdetail/${scope.row.id}` })">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  filters: {
    orderStatusFilter (val, location) {
      let statusObj = {
        'UNPAY': '待付款',
        'PAYING': '付款中',
        'PAYED': '已付款',
        'CLOSED': '已关闭',
        'SETTLED': '已结算',
        'REFUNDFAILED': '退款失败',
        'REFUNDING': '退款中',
        'REFUND': '已退款'
      }
      return statusObj[val]
    }
  },
  props: {
    tableData: {
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
  }
}
</script>

<style lang="scss" scoped>
.list-table{
  .table-head{
    font-size:14px!important;//设置固定的字体大小
  }
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
  .pagination-container {
    margin-top: 10px;
  }
}
</style>
