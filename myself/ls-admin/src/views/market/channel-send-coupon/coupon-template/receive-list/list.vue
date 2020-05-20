<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="serialNumber" label="订单流水号"/>
      <el-table-column label="领取时间">
        <template slot-scope="scope">
          <span>{{ scope.row.pickupTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="优惠券状态">
        <template slot-scope="scope">
          <span v-if="scope.row.couponStatus === null"></span>
          <span v-if="scope.row.couponStatus === 'USED'">已使用</span>
          <span v-if="scope.row.couponStatus === 'UNUSED'">未使用</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券使用时间">
        <template slot-scope="scope">
          <span>{{ scope.row.useTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
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
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
