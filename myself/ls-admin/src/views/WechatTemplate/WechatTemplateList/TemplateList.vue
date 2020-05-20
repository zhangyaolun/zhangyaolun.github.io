<template>
  <div class="template-list-table">
    <el-table :data="list">
      <el-table-column type="index" width="50" />
      <el-table-column prop="userId" label="推送对象">
        <template slot-scope="scope">
          <span v-if="scope.row.userId">{{ scope.row.userId}}</span>
          <span v-else>{{ scope.row.openId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户昵称"/>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column prop="pushTemplateName" label="类型" />
      <el-table-column prop="content" label="发送内容" />
      <el-table-column prop="pushTime" label="发送时间" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.pushTime | formatBackendTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pushStatus" label="发送状态">
        <template slot-scope="scope">
          <span v-if="scope.row.pushStatus === 0">未推</span>
          <span v-if="scope.row.pushStatus === 1">成功</span>
          <span v-if="scope.row.pushStatus === 2">失败</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
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
  created () {
  }
}
</script>

<style>

</style>
