<template>
  <el-card>
    <div slot="header" class="clearfix">历史制券</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :fit="true"
    >
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatBackendTime}}
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="数量"/>
      <el-table-column prop="successCount" label="成功张数" />
      <el-table-column prop="failCount" label="失败张数" />
      <el-table-column label="结果">
        <template slot-scope="scope">
          {{scope.row.result | resultFilter}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  filters: {
    resultFilter (val, location) {
      let resultObj = {
        'FAIL': '失败',
        'SUCCESS': '成功',
        'UPLOADING': '上传中'
      }
      return resultObj[val]
    }
  }
}
</script>
