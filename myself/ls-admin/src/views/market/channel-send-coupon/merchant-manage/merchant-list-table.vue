<template>
  <el-card class="coupon-list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="ID" min-width="50"/>
      <el-table-column prop="merchantName" label="商户名称"/>
      <el-table-column prop="merchantNumber" label="商户号" min-width="100"/>
      <el-table-column prop="merchantKey" label="商户号KEY" min-width="100"/>
      <el-table-column prop="linkedUserName" label="关联用户账号"/>
      <el-table-column label="商户说明" min-width="160">
        <template slot-scope="scope">
          <span v-html="scope.row.comment"></span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="100">
        <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id})">编辑</el-button>
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
  .coupon-list-table{
    .ml10{margin: 2px 5px !important;display: inline-block}
    .pagination-container{
      padding: 0px;
    }
  }
</style>
