<template>
  <el-card class="card-list-table-wrap">
    <el-table :data="list" class="card-list-table">
      <el-table-column label="交易流水号" prop="businessNo" min-width="150" />
      <el-table-column label="会员手机号" prop="phoneNo" />
      <el-table-column label="会员条码" prop="userBarcode" min-width="140" />
      <el-table-column label="交易金额" prop="amount" />
      <el-table-column prop="createTime" label="交易时间" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatBackendTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店编号" prop="shopId" />
      <el-table-column label="pos机号" prop="posNo" />
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.status == 0">失败</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status == 1">已发送</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status == 2">待冲正</el-tag>
          <el-tag type="success" v-else-if="scope.row.status == 3">成功</el-tag>
          <el-tag type="warning" v-else>已退款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="业务类型" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.txnCd == 'T001'">开户</span>
          <span v-else-if="scope.row.txnCd == 'T002'">圈存</span>
          <span v-else-if="scope.row.txnCd == 'T003'">消费</span>
          <span v-else-if="scope.row.txnCd == 'T004'">退货</span>
          <span v-else>冲正</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 2 && scope.row.txnCd=='T003'" size="mini" @click="$emit('handleCorrect', scope.row)">冲正</el-button>
          <el-button size="mini" v-if="scope.row.status == 2 && scope.row.txnCd=='T004'" type="danger" @click="$emit('handleRefund', scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  props: {
    list: {
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
  components: {
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.card-list-table-wrap {
  margin: 20px;
}
</style>
