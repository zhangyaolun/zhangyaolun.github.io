<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="" label="序号" min-width="50">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="用户ID" min-width="100"/>
      <el-table-column prop="name" label="是否会员" min-width="100"/>
      <el-table-column prop="id" label="访达频次" width="110" />
      <el-table-column prop="name" label="首次触达" min-width="120"/>
      <el-table-column prop="name" label="无交易天数" min-width="120"/>
      <el-table-column prop="name" label="7日复购频次" min-width="120"/>
      <el-table-column prop="name" label="7日最高消费金额" min-width="130"/>
      <el-table-column prop="name" label="7日客单价" min-width="120"/>
      <el-table-column prop="name" label="历史最高消费金额" min-width="150"/>
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
}
</style>
