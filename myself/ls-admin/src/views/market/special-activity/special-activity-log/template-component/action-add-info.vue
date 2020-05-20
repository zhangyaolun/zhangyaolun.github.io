<template>
  <div class="bind-form">
    <el-card class="box-card">
      <el-table
        :data="tableData"
      >
        <el-table-column prop="name" label="字段名称" min-width="120"/>
        <el-table-column prop="beforeVal" label="原值" min-width="120"/>
        <el-table-column prop="afterVal" label="新值" min-width="120"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['tableData']
}
</script>

<style lang="scss" scoped>
  .bind-form {
    margin: 20px;
  }
</style>
