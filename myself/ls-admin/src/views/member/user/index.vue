<template>
  <div class="view-member-system-user" v-loading="loading">
    <user-query-form @reset="reset" @query="query" />
    <user-add-btn @add="add" />
    <user-list-table :list="list" :total="total" :list-query="listQuery" @fetch="fetch" @edit="edit" @del="del" @manageRole="manageRole" @resetPwd="resetPwd" />
    <user-dialog :type="type" :visible.sync="userDialogVisible" :info="userInfo" @comfirm="comfirm" @cancle="cancle" @update="update" />
    <role-list-dialog :visible.sync="userRoleDialogVisible" :user-id="userId" @back="back" />
  </div>
</template>

<script>
import userListTable from './user-list-table.vue'
import userQueryForm from './user-query-form.vue'
import userAddBtn from './user-add-btn.vue'
import userDialog from './user-dialog.vue'
import roleListDialog from './user-role-list-dialog/index.vue'
export default {
  components: {
    userListTable,
    userQueryForm,
    userAddBtn,
    userDialog,
    roleListDialog
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      filter: {},
      list: [],
      userDialogVisible: false,
      userRoleDialogVisible: false,
      type: 'create',
      loading: true,
      userId: -1,
      userInfo: {
        userName: '',
        trueName: '',
        sex: 'M',
        email: '',
        phone: '',
        userType: '',
        blockCode: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    resetPwd ({ id }) {
       this.$confirm('确定重置该用户的密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doResetPwd(id)
        })
    },
    doResetPwd (id) {
      this.$api.adminUser.resetPwd({
        userId: id
      }).then(res => {
        this.fetch()
      })
    },
    manageRole ({ id }) {
      this.userId = id
      this.userRoleDialogVisible = true
    },
    back () {
      this.userRoleDialogVisible = false
    },
    edit (data) {
      this.userInfo = Object.assign({}, data)
      this.type = 'edit'
      this.userDialogVisible = true
    },
    del ({ id }) {
      this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      })
    },
    doDel (id) {
      this.$api.adminUser.del({
        userId: id
      }).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    reset () {
      this.filter = {}
      this.listQuery.currPage = 1
      this.fetch()
    },
    resetUserInfo () {
      this.userInfo = {
        userName: '',
        trueName: '',
        sex: 'M',
        email: '',
        phone: '',
        userType: '',
        blockCode: ''
      }
    },
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      // if (Object.keys(this.filter).length) {
      this.listQuery.currPage = 1
      this.fetch()
      // }
    },
    add () {
      this.resetUserInfo()
      this.userDialogVisible = true
      this.type = 'create'
    },
    comfirm (data) {
      this.userDialogVisible = false
      this.$api.adminUser.store(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    update (data) {
      this.userDialogVisible = false
      this.$api.adminUser.update(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    cancle () {
      this.userDialogVisible = false
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminUser.index(data).then(res => {
        this.list = res.data.list
        this.total = res.data.totalCount
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    }
  }
}
</script>
