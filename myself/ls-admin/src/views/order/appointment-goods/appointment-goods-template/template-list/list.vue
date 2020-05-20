<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="commodityCd" label="商品货号" min-width="80"/>
      <el-table-column label="商品显示名称" min-width="120">
        <template slot-scope="scope">
          <router-link :to="'/backend/appointmentGoods/templatedetail/' + scope.row.commodityId" class="ml10 colorRouterLink">
            {{scope.row.commodityName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="适用门店" min-width="80">
        <template slot-scope="scope">
          <router-link :to="'/backend/appointmentGoods/searchShopList/' + scope.row.commodityCd" class="ml10 colorRouterLink">
            {{scope.row.shopCount}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="publishFlg" label="状态" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.publishFlg === 0">未公开</span>
          <span v-if="scope.row.publishFlg === 1">已公开</span>
        </template>
      </el-table-column>
      <el-table-column label="公开时间" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.canShowStart | formatBackendTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始销售日" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.canOrderStart | formatBackendTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止订货日" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.canOrderEnd | formatBackendTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="250">
        <template slot-scope="scope">
          <template>
            <router-link :to="'/backend/appointmentGoods/templatedetail/' + scope.row.commodityId" class="ml10">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {commodityId: scope.row.commodityId, publishFlg: scope.row.publishFlg})">编辑</el-button>
          </template>
          <template v-if="scope.row.publishFlg === 0">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', {commodityId: scope.row.commodityId,publishFlg: 1, title: '公开', name: scope.row.commodityName})">公开</el-button>
          </template>
          <template v-if="scope.row.publishFlg === 1">
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', {commodityId: scope.row.commodityId,publishFlg: '', title: '结束', name: scope.row.commodityName})">结束</el-button>
          </template>
          <el-button size="mini" type="primary" class="inlineBlock ml10" @click="$emit('dimensionalBarcode', scope.row)">生成二维码</el-button>
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
  .colorRouterLink{color: rgb(19,148,236) !important}
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
