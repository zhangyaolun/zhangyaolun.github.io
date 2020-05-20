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
      <el-table-column prop="id" label="活动ID" min-width="100"/>
      <el-table-column prop="name" label="活动名称" min-width="120"/>
      <el-table-column prop="name" label="客群" min-width="120">
        <template slot-scope="scope">
          <router-link to="/backend/userStatistics/templatelist" class="colorRouterLink">客群</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="数量" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.id | millionProcessing}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="参与度" min-width="120"/>
      <el-table-column prop="name" label="完成度" min-width="120"/>
      <el-table-column prop="name" label="放弃率" min-width="120"/>
      <el-table-column prop="name" label="7日留存率" min-width="120"/>
      <el-table-column prop="name" label="7日复购率" min-width="120"/>
      <el-table-column prop="name" label="7日流失率" min-width="120"/>
      <el-table-column prop="" label="操作" min-width="170">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">导入阿里云日志</el-button>
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
  .colorRouterLink{color: rgb(19,148,236) !important}
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
