<template>
  <el-dialog calss="role-list-dialog" v-loading="loading" :title="'用户角色列表'" :visible.sync="dialogFormVisible" @close="close">
    <user-role-query-form @reset="reset" @query="query" />
    <user-role-add-action @add="add" />
    <user-role-list-table :list="list" @del="del"/>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('back')">返 回</el-button>
    </div>
    <role-list-dialog :visible.sync="roleDialogVisible" :user-id="userId" :user-role-list="list" @refresh="refresh" @cancle="cancle" />
  </el-dialog>
</template>

<script>
import userRoleQueryForm from './user-role-query-form.vue'
import userRoleListTable from './user-role-list-table.vue'
import userRoleAddAction from './user-role-add-action.vue'
import roleListDialog from '../role-list-dialog/index.vue'
export default {
  components: {
    userRoleQueryForm,
    userRoleListTable,
    userRoleAddAction,
    roleListDialog
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: true,
      dialogFormVisible: false,
      roleDialogVisible: false,
      filter: {}
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      if (val === true) {
        this.fetch()
      }
    }
  },
  methods: {
    refresh () {
      // this.loading = true
      this.fetch()
    },
    fetch () {
      let data = {
        userId: this.userId
      }
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminUserRole.index(data).then(res => {
        this.list = res.data
        this.loading = false
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    close () {
      this.$emit('update:visible', false)
    },
    reset () {
      this.filter = {}
      this.fetch()
    },
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      if (Object.keys(this.filter).length) {
        this.fetch()
      }
    },
    add () {
      this.roleDialogVisible = true
    },
    cancle () {
      this.roleDialogVisible = false
    },
    del ({ id }) {
      this.$api.adminUserRole.del({
        userId: this.userId,
        roleId: id
      }).then(res => {
        // this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style>

</style>


