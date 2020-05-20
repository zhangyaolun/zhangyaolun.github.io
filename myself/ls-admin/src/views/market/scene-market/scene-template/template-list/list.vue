<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="活动编号" min-width="50"/>
      <el-table-column prop="name" label="活动名称" min-width="120">
        <template slot-scope="scope">
          <router-link class="colorRouterLink" :to="'/backend/sceneMarket/templatedetail/' + scope.row.id">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="rangeList" label="会员范围" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.customerSegments.length <= 1">{{scope.row.customerSegments[0].name}}</span>
          <el-tooltip placement="top" effect="light" v-else>
            <div slot="content">
              <div v-for="item in scope.row.customerSegments" :key="item.name">{{item.name}} </div>
            </div>
            <span class="colorRouterLink">{{`${scope.row.customerSegments[0].name}...[${scope.row.customerSegments.length}]`}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="状态" min-width="60">
        <template slot-scope="scope">
          <span v-if="!scope.row.status"></span>
          <span v-if="scope.row.status === 'CREATED'">未公开</span>
          <span v-if="scope.row.status === 'PUBLISHED'">已公开</span>
          <span v-if="scope.row.status === 'ALREADYEND'">已结束</span>
          <span v-if="scope.row.status === 'PAUSED'">已暂停</span>
        </template>
      </el-table-column>
      <el-table-column label="活动时间" min-width="160">
        <template slot-scope="scope" v-if="scope.row.startTime">
            <span>{{ scope.row.startTime | formatBackendTime('{y}/{m}/{d}')}} </span>
            <span> ~ </span>
            <span> {{ scope.row.endTime | formatBackendTime('{y}/{m}/{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 'ALREADYEND'">
            <router-link :to="'/backend/sceneMarket/templatedetail/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
          <template v-else>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', scope.row)">编辑</el-button>

            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id,status: 'PUBLISHED', title: '公开', name: scope.row.name})" v-if="scope.row.status === 'CREATED'">公开</el-button>

            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id,status: 'PAUSED', title: '暂停', name: scope.row.name})" v-if="scope.row.status === 'PUBLISHED'">暂停</el-button>

            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id,status: 'PUBLISHED', title: '恢复', name: scope.row.name})" v-if="scope.row.status === 'PAUSED'">恢复</el-button>

            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', {id: scope.row.id,status: 'ALREADYEND', title: '结束', name: scope.row.name})">结束</el-button>
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
  .colorRouterLink{color: rgb(19,148,236) !important}
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
