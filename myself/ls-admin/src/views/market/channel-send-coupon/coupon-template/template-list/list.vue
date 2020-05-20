<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="活动Id" min-width="80"/>
      <el-table-column prop="activityName" label="活动名称" min-width="120"/>
      <el-table-column prop="activityKey" label="活动KEY" min-width="120"/>
      <el-table-column label="活动时间" min-width="160">
        <template slot-scope="scope">
          <template>
            <span>{{ scope.row.beginTime | formatBackendTime}}</span>
            <span>至</span>
            <span>{{ scope.row.endTime | formatBackendTime}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="活动类型" min-width="80">
        <template slot-scope="scope">
          <span v-if="!scope.row.type"></span>
          <span v-if="scope.row.type === 'COOPERATION'">渠道合作</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" label="合作方" min-width="80"/>
      <el-table-column prop="" label="优惠券领取状态" min-width="120">
        <template slot-scope="scope">
          <router-link :to="'/backend/channelSendCoupon/templateReceivelist/' + scope.row.activityKey" v-if="scope.row.status === 'PUBLISHED'">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="公开状态" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'CREATED'">未公开</span>
          <span v-if="scope.row.status === 'PUBLISHED'">已公开</span>
          <span v-if="scope.row.status === 'DELETED'">已删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 'PUBLISHED'">
            <router-link :to="'/backend/channelSendCoupon/templatedetail/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
          <template v-if="scope.row.status === 'CREATED'">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id})">编辑</el-button>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id, status: 'PUBLISHED', title: '公开', name: scope.row.activityName})">公开</el-button>
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', {id: scope.row.id, status: 'DELETED', title: '删除', name: scope.row.activityName})">删除</el-button>
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
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
