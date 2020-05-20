<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="活动ID" min-width="50"/>
      <el-table-column prop="activityName" label="活动名称" min-width="120"/>
      <el-table-column prop="activitySecondTitle" label="活动副标题" min-width="120"/>
      <el-table-column label="活动生效时间" min-width="160">
        <template slot-scope="scope">
          <template>
            <span>{{ scope.row.beginTime | formatBackendTime}}</span>
            <span>至</span>
            <span>{{ scope.row.endTime | formatBackendTime}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="活动状态" min-width="60">
        <template slot-scope="scope">
          {{scope.row.activityStatus | formatActivityStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="公开状态" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.localStatus === 'CREATED'">未公开</span>
          <span v-if="scope.row.localStatus === 'PUBLISHED'">已公开</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="170">
        <template slot-scope="scope">
          <template>
            <router-link :to="'/backend/payCourtesyTemplate/templatedetail/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
          <template v-if="scope.row.localStatus === 'CREATED'">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id})">编辑</el-button>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateFun', {id: scope.row.id,localStatus: 'PUBLISHED', title: '公开', name: scope.row.activityName})">公开</el-button>
          </template>

          <template v-if="scope.row.localStatus === 'PUBLISHED' && scope.row.activityStatus !== 'TERMINATE_ACT_STATUS'">
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateFun', {id: scope.row.id,localStatus: 'PUBLISHED', title: '终止', name: scope.row.activityName})">终止</el-button>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateFun', {id: scope.row.id,localStatus: 'PUBLISHED', title: '同步', name: scope.row.activityName})">同步微信详情</el-button>
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
  },
  filters: {
    formatActivityStatus (val) {
      let _formatActivityStatus = {
        'CREATE_ACT_STATUS': '已创建',
        'ONGOING_ACT_STATUS': '运行中',
        'TERMINATE_ACT_STATUS': '已终止',
        'STOP_ACT_STATUS': '已暂停',
        'OVER_TIME_ACT_STATUS': '已过期',
        'CREATE_ACT_FAILED': '创建活动失败'
      }
      return _formatActivityStatus[val] || ''
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
