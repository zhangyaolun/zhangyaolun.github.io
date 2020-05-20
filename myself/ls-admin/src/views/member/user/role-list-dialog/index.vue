<template>
  <el-dialog calss="role-list-dialog" v-loading="loading" append-to-body :title="'添加用户角色'" :visible.sync="dialogFormVisible" @close="close">
    <role-query-form @reset="reset" @query="query" />
    <role-list-table :list="list" @add="add" :total="total" :list-query="listQuery" @fetch="fetch" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('cancle')">返 回</el-button>
    </div>
  </el-dialog>
</template>

<script>
import roleQueryForm from './role-query-form.vue'
import roleListTable from './role-list-table.vue'
export default {
  components: {
    roleQueryForm,
    roleListTable
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    userRoleList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      list: [],
      loading: true,
      dialogFormVisible: false,
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
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminRole.index(data).then(res => {
        res.data.list.forEach(ele => {
          if (this.userRoleList.some(list => list.id === ele.id)) {
            ele.is_add = true
          } else {
            ele.is_add = false
          }
        })
        this.list = res.data.list
        this.total = res.data.totalCount
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
      this.listQuery.currPage = 1
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
        this.listQuery.currPage = 1
        this.fetch()
      }
    },
    add ({ id }) {
      this.$api.adminUserRole.store({
        userId: this.userId,
        roleId: id
      }).then(res => {
        this.$emit('refresh')
        const index = this.list.findIndex(ele => ele.id === id)
        this.list[index].is_add = true
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style>

</style>


