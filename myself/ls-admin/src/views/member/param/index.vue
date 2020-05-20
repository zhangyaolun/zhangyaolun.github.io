<template>
  <div class="view-member-system-role" v-loading="loading">
    <param-query-form @reset="reset" @query="query" />
    <param-add-btn @add="add" />
    <param-list-table :list="list" :total="total" :list-query="listQuery" @fetch="fetch" @edit="edit" @del="del"/>
    <param-dialog v-if="isVisible" :type="type" :visible.sync="paramDialogVisible" :info="paramInfo" @comfirm="comfirmParam" @cancle="cancleParam" @update="updateParam" />
  </div>
</template>

<script>
import paramListTable from './param-list-table.vue'
import paramQueryForm from './param-query-form.vue'
import paramAddBtn from './param-add-btn.vue'
import paramDialog from './param-dialog.vue'

export default {
  components: {
    paramListTable,
    paramQueryForm,
    paramAddBtn,
    paramDialog
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
      paramDialogVisible: false,
      isVisible:false,
      type: 'create',
      loading: true,
      paramInfo: {
        conParamCode: '',
        conParamName: '',
        conParamValue: '',
        conParamType:'0',
        superParamCode:''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    //添加按钮单击事件
    add () {
      this.isVisible = true
      setTimeout(() => {
	      this.resetParamInfo()
        this.paramDialogVisible = true
        this.type = 'create'
        }, 0);
    },
    //编辑按钮单击事件
    edit (data) {
      this.isVisible = true
       setTimeout(() => {
        this.paramInfo = Object.assign({}, data)
        this.type = 'edit'
        this.paramDialogVisible = true
       },0)
    },
    //删除按钮单击事件
    del ({ id }) {
      this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      })
    },
    //删除参数配置方法
    doDel (id) {
      this.$api.adminParam.del({
        id: id
      }).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    //重置按钮单击事件
    reset () {
      this.filter = {}
      this.listQuery.currPage = 1
      this.fetch()
    },
    //表单重置
    resetParamInfo () {
      this.paramInfo = {
        conParamCode: '',
        conParamName: '',
        conParamValue: '',
        conParamType:'',
        superParamCode:''
      }
    },
    //查询按钮单击
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      this.listQuery.currPage = 1
      this.fetch()
    },
    //新增参数配置
    comfirmParam (data) {
      this.$api.adminParam.store(data).then(res => {
        this.isVisible = false
        this.paramDialogVisible = false
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    //修改参数配置
    updateParam (data) {
      this.$api.adminParam.update(data).then(res => {
        this.isVisible = false
        this.paramDialogVisible = false
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    cancleParam () {
      this.isVisible = false
      this.paramDialogVisible = false
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, data, this.filter)
      }
      this.$api.adminParam.index(data).then(res => {
        this.list = res.data.list
        // this.list = treeDataTranslate(res.data.list, "conParamCode");
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
