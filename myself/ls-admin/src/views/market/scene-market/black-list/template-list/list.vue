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
      <el-table-column prop="id" label="用户ID" min-width="100"/>
      <el-table-column prop="name" label="是否是会员" min-width="100"/>
      <el-table-column prop="name" label="积分" min-width="120"/>
      <el-table-column prop="name" label="手机" min-width="120"/>
      <el-table-column prop="name" label="备注" min-width="200"/>
      <el-table-column prop="" label="操作" min-width="130">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="tableBtn" @click="$emit('mod', scope.row)">备注</el-button>
          <el-button type="danger" size="mini" class="tableBtn" @click="$emit('del', scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
