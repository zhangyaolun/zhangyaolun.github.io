<template>
  <div class="view-member-system-role" v-loading="loading">
    <role-query-form @reset="reset" @query="query" />
    <role-add-btn @add="add" />
    <role-list-table :list="list" :total="total" :list-query="listQuery" @fetch="fetch" @edit="edit" @del="del" @manageRoleMenu="manageRoleMenu" />
    <role-dialog :type="type" :visible.sync="roleDialogVisible" :info="roleInfo" @comfirm="comfirmRole" @cancle="cancleRole" @update="updateRole" />
    <role-menu-dialog :visible.sync="roleMenuDialogVisible" :role-id="roleId" @comfirm="comfirmRoleMenu" @cancle="cancleRoleMenu" @update="updateRoleMenu" />
  </div>
</template>

<script>
import roleListTable from './role-list-table.vue'
import roleQueryForm from './role-query-form.vue'
import roleAddBtn from './role-add-btn.vue'
import roleDialog from './role-dialog.vue'
import roleMenuDialog from './role-menu-dialog.vue'

export default {
  components: {
    roleListTable,
    roleQueryForm,
    roleAddBtn,
    roleDialog,
    roleMenuDialog
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
      roleDialogVisible: false,
      roleId: -1,
      roleMenuDialogVisible: false,
      type: 'create',
      loading: true,
      roleInfo: {
        roleCode: '',
        roleName: '',
        roleDesc: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    updateRoleMenu () {

    },
    cancleRoleMenu () {
      this.roleMenuDialogVisible = false
    },
    comfirmRoleMenu (data) {
      this.roleMenuDialogVisible = false
      if (data.length) {
        this.$api.adminRoleMenu.update({
          roleId: this.roleId,
          menuIdList: data
        }).then(res => {
          this.loading = true
          this.fetch()
        })
      }
    },
    manageRoleMenu ({ id }) {
      this.roleId = id
      this.roleMenuDialogVisible = true
    },
    edit (data) {
      this.roleInfo = Object.assign({}, data)
      this.type = 'edit'
      this.roleDialogVisible = true
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
      this.$api.adminRole.del({
        roleId: id
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
    resetRoleInfo () {
      this.roleInfo = {
        roleCode: '',
        roleName: '',
        roleDesc: ''
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
      this.resetRoleInfo()
      this.roleDialogVisible = true
      this.type = 'create'
    },
    comfirmRole (data) {
      this.roleDialogVisible = false
      this.$api.adminRole.store(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    updateRole (data) {
      this.roleDialogVisible = false
      this.$api.adminRole.update(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    cancleRole () {
      this.roleDialogVisible = false
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminRole.index(data).then(res => {
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
