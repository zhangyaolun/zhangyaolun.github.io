<template>
  <div class="view-member-system-menu" v-loading="loading">
    <menu-query-form @reset="reset" @query="query" />
    <menu-add-btn @add="add" />
    <menu-list-table :list="list" :total="total" :list-query="listQuery" @fetch="fetch" @edit="edit" @del="del" />
    <menu-dialog :type="type" :visible.sync="menuDialogVisible" :menu-id="menuId" @comfirm="comfirm" @cancle="cancle" @update="update" />
  </div>
</template>

<script>
import menuListTable from './menu-list-table.vue'
import menuQueryForm from './menu-query-form.vue'
import menuAddBtn from './menu-add-btn.vue'
import menuDialog from './menu-dialog.vue'

export default {
  components: {
    menuListTable,
    menuQueryForm,
    menuAddBtn,
    menuDialog
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
      menuDialogVisible: false,
      type: 'create',
      loading: true,
      menuId: -1,
      menuInfo: {
        menuName: '',
        modelObj: '',
        sysObj: '',
        menuAddr: '',
        menuIndex: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    edit ({ id }) {
      this.menuId = id
      this.type = 'edit'
      this.menuDialogVisible = true
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
      this.$api.adminMenu.del({
        id: id
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
      this.menuDialogVisible = true
      this.type = 'create'
    },
    comfirm (data) {
      this.menuDialogVisible = false
      this.$api.adminMenu.store(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    update (data) {
      this.menuId = -1
      this.menuDialogVisible = false
      this.$api.adminMenu.update(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    cancle () {
      this.menuDialogVisible = false
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminMenu.index(data).then(res => {
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
