<template>
  <el-card class="role-list-form">
    <el-table :data="list">
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="roleName" label="角色名" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_add===false" type="primary" size="mini" @click="$emit('add', scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currPage" :autoScroll="false" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
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
