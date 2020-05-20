<template>
  <div class="view-member-system-model" v-loading="loading">
    <model-query-form @reset="reset" @query="query" />
    <model-add-btn @add="add" />
    <model-list-table :list="list" :total="total" :list-query="listQuery" @fetch="fetch" @edit="edit" @del="del" />
    <model-dialog :type="type" :visible.sync="modelDialogVisible" :info="modelInfo" @comfirm="comfirm" @cancle="cancle" @update="update" />
  </div>
</template>

<script>
import modelListTable from './model-list-table.vue'
import modelQueryForm from './model-query-form.vue'
import modelAddBtn from './model-add-btn.vue'
import modelDialog from './model-dialog.vue'

export default {
  components: {
    modelListTable,
    modelQueryForm,
    modelAddBtn,
    modelDialog
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
      modelDialogVisible: false,
      type: 'create',
      loading: true,
      modelInfo: {
        modelCode: '',
        modelName: '',
        modelAddr: '',
        modelIndex: '',
        modelLevel: '',
        supModel: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    edit (data) {
      this.modelInfo = Object.assign({}, data)
      this.type = 'edit'
      this.modelDialogVisible = true
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
      this.$api.adminModel.del({
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
    resetModelInfo () {
      this.modelInfo = {
        modelCode: '',
        modelName: '',
        modelAddr: '',
        modelIndex: '',
        modelLevel: '',
        supModel: ''
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
      this.resetModelInfo()
      this.modelDialogVisible = true
      this.type = 'create'
    },
    comfirm (data) {
      this.modelDialogVisible = false
      this.$api.adminModel.store(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    update (data) {
      this.modelDialogVisible = false
      this.$api.adminModel.update(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    cancle () {
      this.modelDialogVisible = false
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminModel.index(data).then(res => {
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
