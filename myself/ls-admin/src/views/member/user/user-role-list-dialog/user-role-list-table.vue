<template>
  <div class="role-list-form">
    <el-table :data="list">
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="roleName" label="角色名" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$emit('del', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
