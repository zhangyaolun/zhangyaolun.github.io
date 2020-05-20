<template>
  <el-card class="list-table">
    <el-table
      :data="tableData"
      :fit="true"
    >
      <el-table-column prop="orderNo" label="订单号"/>
      <el-table-column label="子订单号">
        <template slot-scope="scope">
          <span class="colorRouterLink pointer" @click="subOrderListClick(scope.row.subOrderList)">{{scope.row.subOrderList.length}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品">
        <template slot-scope="scope">
          {{scope.row.commodityName}}
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{scope.row.subTotalQty}}
        </template>
      </el-table-column>
      <el-table-column prop="commodityCd" label="货号"/>
      <el-table-column label="userID/手机号" min-width="100">
        <template slot-scope="scope">
          {{`${scope.row.userId} x ${scope.row.mobile}`}}
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="100">
        <template slot-scope="scope">
          {{scope.row.orderStatus | payTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="支付时间">
        <template slot-scope="scope">
          <span v-if="scope.row.payedTime">{{scope.row.payedTime | formatBackendTime('{y}/{m}/{d} {h}:{i}:{s}')}}</span>
          <span v-else>- -</span>
        </template>
      </el-table-column>
      <el-table-column label="售后状态" min-width="100">
        <template slot-scope="scope">
          {{scope.row.afterSaleStatus | afterSaleStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column label="取货日期">
        <template slot-scope="scope">
          <span v-if="scope.row.takeDate">{{scope.row.takeDate | formatBackendTime('{y}/{m}/{d}')}}</span>
          <span v-else>- -</span>
        </template>
      </el-table-column>
      <el-table-column label="提货门店">
        <template slot-scope="scope">
          <span v-if="scope.row.shop"> {{ scope.row.shop.shopName  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="ml10" @click="$router.push({ path: `/backend/appointmentGoods/orderdetail/${scope.row.id}` })">详情</el-button>
          <template>
            <el-button type="danger" size="mini" class="ml10" @click="$emit('itemDialog', scope.row)" v-if="scope.row.orderStatus === 'HAS_PAYED' && (scope.row.afterSaleStatus === 'WAITING_SENDING' || scope.row.afterSaleStatus === 'WAITING_CONFIRM')">退款</el-button>
            <el-button type="danger" size="mini" class="ml10" @click="$emit('itemDialog', scope.row)" v-if="scope.row.orderStatus === 'HAS_PAYED' && scope.row.afterSaleStatus === 'WAITING_PICK'">取消</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="tips">提示：代店订购退款，次日10:00退款；邮件发送退款，确认后直接退款。</div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
    <order-dialog :visible.sync="orderDialogVisible" :table="subOrderList"></order-dialog>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import orderDialog from './order-dialog'
export default {
  components: {
    Pagination,
    orderDialog
  },
  filters: {
    payTypeFilter (val, location) {
      let payTypeObj = {
        'WAITING_PAY': '待支付',
        'HAS_PAYED': '已支付',
        'HAS_CANCEL': '已取消'
      }
      return payTypeObj[val]
    },
    afterSaleStatusFilter (val, location) {
      let Obj = {
        'WAITING_SENDING': '待发送',
        'WAITING_CONFIRM': '待确认',
        'WAITING_PICK': '待取货',
        'HAS_REFUND': '已退款',
        'REFUND_DOING': '退款中',
        'HAS_PICK': '已取货',
        'HAS_EXPIRED': '已过期'
      }
      return Obj[val]
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
  },
  data () {
    return {
      orderDialogVisible: false,
      subOrderList: []
    }
  },
  methods: {
    subOrderListClick (data) {
      this.orderDialogVisible = true
      this.subOrderList = data
    }
  }
}
</script>

<style lang="scss" scoped>
.list-table{
  .colorRouterLink{color: rgb(19,148,236) !important}
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
  .tips{
    margin-top: 20px;
    font-size: 12px;
    line-height: 32px;
  }
}
</style>
