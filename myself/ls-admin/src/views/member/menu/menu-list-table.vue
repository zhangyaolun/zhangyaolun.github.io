<template>
  <el-card class="menu-table-wrap">
    <el-table :data="list">
      <el-table-column prop="menuName" label="菜单名称" min-width="80px" />
      <el-table-column prop="modelCode" label="上级模块编码" min-width="100px" />
      <el-table-column prop="modelName" label="上级模块名称" min-width="100px" />
      <el-table-column prop="menuAddr" label="地址" min-width="100px" />
      <el-table-column prop="menuIndex" label="序号" min-width="50px" />
      <el-table-column prop="createTime" label="创建时间" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120px">
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
.menu-table-wrap {
  margin: 20px;
}
</style>
