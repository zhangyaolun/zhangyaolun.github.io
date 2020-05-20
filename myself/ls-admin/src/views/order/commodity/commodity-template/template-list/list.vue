<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="id" label="商品ID" min-width="120"/>
      <el-table-column prop="name" label="商品名称" min-width="200"/>
      <el-table-column prop="stock" label="商品库存" min-width="80"/>
      <el-table-column prop="price" label="商品售价" min-width="80"/>
      <el-table-column prop="status" label="商品状态" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'DELETED'">废弃</span>
          <span v-if="scope.row.status === 'ONSALE'">上架</span>
          <span v-if="scope.row.status === 'OFFSALE'">下架</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="200">
        <template slot-scope="scope">
          <router-link :to="'/backend/commodity/templatedetail/' + scope.row.id" class="ml10">
            <el-button type="primary" size="mini">详情</el-button>
          </router-link>
          <section v-if="scope.row.status !== 'DELETED'" class="inlineBlock">
            <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', scope.row)">编辑</el-button>
            <span v-if="scope.row.status === 'ONSALE'">
               <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', scope.row, { title: '下架' })">下架</el-button>
            </span>
            <span v-if="scope.row.status === 'OFFSALE'">
               <el-button class="ml10" size="mini" type="primary" @click="$emit('updateConfirm', scope.row, { title: '上架' })">上架</el-button>
            </span>
            <el-button class="ml10" size="mini" type="danger" @click="$emit('updateConfirm', scope.row, { title: '废弃' })">废弃</el-button>
          </section>
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
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
