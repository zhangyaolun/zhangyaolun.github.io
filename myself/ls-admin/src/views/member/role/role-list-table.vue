<template>
  <el-card class="user-table-wrap">
    <el-table :data="list">
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleDesc" label="角色描述" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$emit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="$emit('manageRoleMenu', scope.row)">菜单管理</el-button>
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
