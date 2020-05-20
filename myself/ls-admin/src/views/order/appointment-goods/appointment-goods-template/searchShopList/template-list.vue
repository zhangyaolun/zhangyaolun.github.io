<template>
  <el-card class="list-table">
    <el-table
      :data="tableData"
    >
      <el-table-column prop="shopCd" label="门店ID" min-width="80"/>
      <el-table-column prop="shopName" label="门店名称" min-width="80"/>
      <el-table-column prop="cityName" label="所在城市" min-width="50"/>
      <el-table-column prop="commodityCd" label="货号" min-width="50"/>
      <el-table-column prop="commodityName" label="商品名称" min-width="200"/>
      <el-table-column label="营业历类型" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.businessType | businessTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.businessStatus | businessStatusFilter}}</span>
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
  },
  filters: {
    businessTypeFilter (val, location) {
      let Obj = {
        '01': '周循环不营业',
        '02': '暂停营业',
        '03': '特殊日营业',
        '04': '正常营业'
      }
      return Obj[val]
    },
    businessStatusFilter (val, location) {
      let Obj = {
        0: '正常营业',
        1: '关店',
        2: '暂停营业',
        3: '未开',
        4: '转户',
        5: '长期停业'
      }
      return Obj[val]
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
