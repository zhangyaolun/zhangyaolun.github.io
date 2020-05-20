<template>
  <el-card class="coupon-list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="couponId" label="优惠券ID"/>
      <el-table-column prop="couponName" label="优惠券名称"/>
      <el-table-column prop="userId" label="会员ID"/>
      <el-table-column prop="userCouponStatus" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.userCouponStatus | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="useShopId" label="使用门店"/>
      <el-table-column label="使用时间" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.useDate | formatBackendTime}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="" label="操作" min-width="30">-->
<!--        <template></template>-->
<!--      </el-table-column>-->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter (val) {
      let statusObj = {
        'CREATED': '未激活',
        'ACTIVATED': '已激活',
        'USED': '已使用',
        'LOCKED': '已锁定',
        'DELETED': '已作废',
        'TRANSFERING': '转赠中',
        'OVERDUE': '已过期'
      }
      return val ? statusObj[val] : ''
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
.coupon-list-table{
  .ml10{margin: 2px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
