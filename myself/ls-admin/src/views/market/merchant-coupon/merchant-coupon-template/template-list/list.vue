<template>
  <el-card class="coupon-list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="商家券ID" min-width="50"/>
      <el-table-column prop="name" label="商家券名称" min-width="120"/>
      <el-table-column label="生效时间" min-width="160">
        <template slot-scope="scope">
          <template>
            <span>{{ scope.row.availableBeginTime | formatBackendTime}}</span>
            <span>至</span>
            <span>{{ scope.row.availableEndTime | formatBackendTime}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="商家券状态" min-width="60">
        <template slot-scope="scope">
          <span v-if="!scope.row.status"></span>
          <span v-if="scope.row.status === 'UNAUDIT'">审核中</span>
          <span v-if="scope.row.status === 'RUNNING'">运行中</span>
          <span v-if="scope.row.status === 'STOPED'">已停止</span>
          <span v-if="scope.row.status === 'PAUSED'">暂停发放</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="公开状态" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.openStatus === 'CREATED'">未公开</span>
          <span v-if="scope.row.openStatus === 'PUBLISHED'">已公开</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="170">
        <template slot-scope="scope">
          <template>
            <router-link :to="'/backend/merchantCoupon/templatedetail/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
          <template v-if="scope.row.openStatus === 'CREATED'">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id})">编辑</el-button>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id,openStatus: 'PUBLISHED', title: '公开', name: scope.row.name})">公开</el-button>
          </template>

          <template v-if="scope.row.openStatus === 'PUBLISHED'">
            <router-link :to="'/backend/merchantCoupon/uploadList/' + scope.row.id" class="ml10">
              <el-button type="primary" size="mini">上传商家券</el-button>
            </router-link>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {id: scope.row.id,openStatus: '', title: '同步', name: scope.row.name})">同步微信详情</el-button>
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
.coupon-list-table{
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
