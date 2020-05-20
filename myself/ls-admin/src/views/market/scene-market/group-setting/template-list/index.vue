<template>
  <div class="container" v-loading="loading">
    <template-action @creat="addDialog"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="query"  @mod="modDialog" @del="delComfirm"/>
    <groupsetting-dialog :visible.sync="dialogVisible" :info.sync="info" @comfirm="addModComfirm"></groupsetting-dialog>
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import groupsettingDialog from './groupSetting-dialog'

export default {
  components: {
    templateList,
    templateAction,
    groupsettingDialog
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      total: null,
      list: null,
      dataFetched: false,
      dialogVisible: false,
      info: {
        id: '',
        name: '',
        memo: '',
        file: '',
        csvName: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.sceneMarketLoading
    }
  },
  created () {
    this.$store.dispatch('sceneMarket/setLoadingData', true)
    this.query()
  },
  methods: {
    query () {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.groupSetting.getList(this.listQuery).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.totalCount
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    addDialog () {
      this.info.id = ''
      this.info.name = ''
      this.info.memo = ''
      this.info.file = ''
      this.info.csvName = ''
      this.dialogVisible = true
    },
    modDialog ({ id, name, memo }) {
      this.dialogVisible = true
      this.info.id = id
      this.info.name = name
      this.info.memo = memo
      this.info.file = ''
      this.info.csvName = ''
    },
    addModComfirm (val) {
      this.$confirm(`是否确定${val.title}此客群信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.info.file === '') {
          let fileData = new FormData()
          fileData.append('file', null)
          this.$set(this.info, 'file', fileData)
        }
        this.info.id === '' ? this.add() : this.update()
      })
    },
    add () {
      this.dialogVisible = false
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.groupSetting.add(this.info).then(res => {
        this.$message.success('创建成功')
        this.query()
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.dialogVisible = true
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    update () {
      this.dialogVisible = false
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.groupSetting.update(this.info).then(res => {
        this.dialogVisible = false
        this.$message.success('修改成功')
        this.query()
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.dialogVisible = true
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    delComfirm ({ id }) {
      this.$confirm(`是否确定删除此客群【${id}】`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(id)
      })
    },
    del (id) {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.groupSetting.delete(id).then(res => {
        this.dialogVisible = false
        this.$message.success('删除成功')
        this.query()
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
