<template>
  <el-card class="user-table-wrap">
    <el-table :data="list">
      <el-table-column prop="userName" label="登录账号" min-width="50px" />
      <el-table-column prop="trueName" label="姓名" min-width="40px" />
      <el-table-column prop="phone" label="手机号" min-width="80px" />
      <el-table-column prop="sex" label="性别" min-width="30px">
        <template slot-scope="scope">
          <span v-if="scope.row.sex==='M'">男</span>
          <span v-if="scope.row.sex==='F'">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="用户类型" min-width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.userType==='Y'">yoren用户</span>
          <span v-if="scope.row.userType==='C'">合作用户</span>
          <span v-if="scope.row.userType==='P'">渠道商户</span>
        </template>
      </el-table-column>
      <el-table-column prop="blockCode" label="所属区域" min-width="60px" />
      <el-table-column prop="createTime" label="创建时间" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatBackendTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$emit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="$emit('manageRole', scope.row)">角色管理</el-button>
          <el-button size="mini" @click="$emit('resetPwd', scope.row)">重置密码</el-button>
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
