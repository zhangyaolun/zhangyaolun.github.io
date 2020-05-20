<template>
  <el-card class="coupon-list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="reportDate" label="交易记录时间">
        <template slot-scope="scope">
          <span>{{scope.row.reportDate | reportDateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="30">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$emit('getTempUrl', scope.row )">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="$emit('fetch')" />
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
  },
  filters: {
    reportDateFilter (val, old) {
      return val.toString().slice(0, 4) + '-' + val.toString().slice(4)
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
