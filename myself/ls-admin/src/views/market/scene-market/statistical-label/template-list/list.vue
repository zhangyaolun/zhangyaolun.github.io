<template>
  <el-card class="list-table">
    <el-table
      ref="multipleTable"
      :data="tableData"
    >
      <el-table-column prop="" label="序号" min-width="50">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="名称" min-width="100"/>
      <el-table-column prop="id" label="统计类型" min-width="120"/>
      <el-table-column prop="id" label="统计对象" min-width="120"/>
      <el-table-column prop="id" label="类型" min-width="120"/>
    </el-table>
  </el-card>
</template>

<script>
export default {
  components: {
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.list-table{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0) !important;
  .colorRouterLink{color: rgb(19,148,236) !important}
  .tableBtn{margin: 2px 5px !important;display: inline-block}
}
</style>
