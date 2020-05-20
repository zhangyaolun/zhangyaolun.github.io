<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      :fit="true"
    >
      <el-table-column prop="orderNo" label="拼团编号"/>
      <el-table-column prop="orderSubNo" label="拼团订单编号"/>
      <el-table-column label="拼团状态">
        <template slot-scope="scope">
          {{scope.row.orderStatus | orderStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="拼团活动名称"/>
      <el-table-column prop="templateId" label="拼团活动ID" />
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{scope.row.mobile | mobileEncryption}}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="会员ID" />
      <el-table-column label="下单时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatBackendTime}}
        </template>
      </el-table-column>
      <el-table-column label="支付金额(元)">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{scope.row.orderSubStatus | orderSubStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="ml10" @click="$emit('detail', scope.row)">详情</el-button>
          <template v-if="scope.row.orderSubStatus == 'SETTLED' && scope.row.amount > 0">
            <el-button type="danger" size="mini" class="ml10" @click="$emit('refund', scope.row)">退款</el-button>
          </template>
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
      let orderStatusObj = {
        'GROUPING': '拼团中',
        'SUCCESS': '拼团成功',
        'FAIL': '拼团失败'
      }
      return orderStatusObj[val]
    },
    orderSubStatusFilter (val, location) {
      let orderSubStatusObj = {
        'UNPAY': '待付款',
        'PAYED': '已付款',
        'PAYING': '付款中',
        'CLOSED': '已关闭',
        'REFUNDING': '退款中',
        'REFUND': '已退款',
        'SETTLED': '已结算',
        'REFUNDFAILED': '退款失败'
      }
      return orderSubStatusObj[val]
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
}
</style>
