<template>
  <div class="container" v-loading="loading">
    <template-action />
    <template-list v-if="dataFetched" :table-data="list" @mod="modDialog" @del="del"/>
    <blacklist-dialog :visible.sync="dialogVisible" :info.sync="info" @comfirm="modComfirm"></blacklist-dialog>
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import blacklistDialog from './blackList-dialog'

export default {
  components: {
    templateList,
    templateAction,
    blacklistDialog
  },
  data () {
    return {
      list: null,
      dataFetched: false,
      dialogVisible: false,
      info: {
        id: '',
        remark: ''
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
      this.$api.specialActivity.getList().then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    modDialog () {
      this.dialogVisible = true
      this.info.remark = ''
    },
    modComfirm () {
      this.$confirm(`是否确定修改此备注`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
        this.$message.success('修改成功')
      })
    },
    del ({ id }) {
      this.$confirm(`是否确定此用户解除限制【${id}】`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
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
