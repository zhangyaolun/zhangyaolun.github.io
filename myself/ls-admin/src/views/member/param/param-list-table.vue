<template>
  <el-card class="user-table-wrap">
    <el-table :data="list"  row-key="id">
      <el-table-column prop="conParamCode" label="参数编码" />
      <el-table-column prop="conParamName" label="参数名称" />
      <el-table-column prop="conParamValue" label="参数值" />
      <el-table-column  label="参数等级">
        <template slot-scope="scope">
          <span v-if="scope.row.conParamType == 0">一级参数</span>
          <span v-if="scope.row.conParamType == 1">二级参数</span>
        </template>
      </el-table-column>
      <el-table-column prop="superParamCode" label="父级编码">
        <template slot-scope="scope">
          <span>{{ scope.row.superParamCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$emit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="$emit('del', scope.row)">删除</el-button>
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
.user-table-wrap {
  margin: 20px;
}
</style>
