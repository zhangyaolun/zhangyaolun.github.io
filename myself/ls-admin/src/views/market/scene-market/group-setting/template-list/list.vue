<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="" label="序号" min-width="30">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="客群名称" min-width="100"/>
      <el-table-column prop="labelCnt" label="人数" min-width="50"/>
      <el-table-column prop="rule" label="规则" min-width="150"/>
      <el-table-column prop="memo" label="备注" min-width="150"/>
      <el-table-column prop="" label="操作" min-width="100">
        <template slot-scope="scope" v-if="scope.row.type === 'HAND'">
          <el-button type="primary" size="mini" class="tableBtn" @click="$emit('mod', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" class="tableBtn" @click="$emit('del', scope.row)">删除</el-button>
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0) !important;
  .tableBtn{margin: 2px 5px !important;display: inline-block}
}
</style>
