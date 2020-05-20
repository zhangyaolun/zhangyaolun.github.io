<template>
  <el-card class="list-table">
    <el-table
      :data="tableData"
    >
      <el-table-column label="序号" min-width="120">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="日志时间" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="执行人" min-width="120"/>
      <el-table-column prop="type" label="活动类型" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'COUPONACTIVITY'">领券活动</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="动作类型" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.createType === 'CREATE'">创建</span>
          <span v-if="scope.row.createType === 'UPDATE'">更新</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="210">
        <template slot-scope="scope">
          <template>
              <el-button type="primary" size="mini" @click="$emit('logdetail', scope.row)">详情</el-button>
          </template>
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
  margin-top: 20px;
  .colorRouterLink{color: rgb(19,148,236) !important}
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
